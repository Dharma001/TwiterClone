import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/common/Loading';
import useLoading from '../../hooks/useLoading';
import { useAuth } from '../../hooks/useAuth';
import { useFormErrors } from '../../hooks/useFormErrors';

interface RegisterFormData {
  name: string;
  email: string;
  dob: Date;
}

interface OtpFormData {
  otp: string;
}

interface PasswordFormData {
  password: string;
}

const AuthModal: React.FC = () => {
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [isCreatePasswordVisible, setIsCreatePasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const { authRegister, verifyOtpCode, passwordCreate, loading, error } = useAuth();
  const isLoadingGlobal = useSelector((state: RootState) => state.loading.isLoading);
  const { isInitialLoading } = useLoading(1000);

  const { register: registerForm, handleSubmit: handleSubmitForm, formState: { errors: registerErrors } } = useForm<RegisterFormData>();
  const { register: registerOtp, handleSubmit: handleSubmitOtp, formState: { errors: otpErrors }, reset: resetOtp } = useForm<OtpFormData>();
  const { register: registerPassword, handleSubmit: handleSubmitPassword, formState: { errors: passwordErrors }, reset: resetPassword } = useForm<PasswordFormData>();

  {/* Month, Day, Year Selectors */}
  const [month, setMonth] = useState('');

  const months = [
      { value: 1, label: 'January' },
      { value: 2, label: 'February' },
      { value: 3, label: 'March' },
      { value: 4, label: 'April' },
      { value: 5, label: 'May' },
      { value: 6, label: 'June' },
      { value: 7, label: 'July' },
      { value: 8, label: 'August' },
      { value: 9, label: 'September' },
      { value: 10, label: 'October' },
      { value: 11, label: 'November' },
      { value: 12, label: 'December' },
  ];

  const [day, setDay] = useState('');
  const [year, setYear] = useState('');

  const { getErrorMessage: getRegisterErrorMessage } = useFormErrors<RegisterFormData>(registerErrors, error);
  const { getErrorMessage: getOtpErrorMessage } = useFormErrors<OtpFormData>(otpErrors, error);
  const { getErrorMessage: getPasswordErrorMessage } = useFormErrors<PasswordFormData>(passwordErrors, error);

  const onRegisterSubmit = async (data: RegisterFormData) => {
    const dob = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
    const registrationSuccess = await authRegister(data.name, data.email , dob);
    if (registrationSuccess) {
      setEmail(data.email);
      setIsOtpVisible(true);
    }
  };

  const onOtpSubmit = async (data: OtpFormData) => {
    const verificationSuccess = await verifyOtpCode(data.otp, email);
    resetOtp();
    if (verificationSuccess) {
      setIsCreatePasswordVisible(true);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    const passwordSuccess = await passwordCreate(email, data.password);
    resetPassword();
    if (passwordSuccess) {
      navigate('/login');
    }
  };

  if (isInitialLoading || isLoadingGlobal || loading) {
    return <Loading />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-black text-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        {isOtpVisible && !isCreatePasswordVisible ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">OTP Verification</h2>
            <form onSubmit={handleSubmitOtp(onOtpSubmit)} className="space-y-4">
              <div>
                <input
                  type="text"
                  maxLength={6}
                  pattern="\d{6}"
                  className="border rounded w-full p-2 text-center bg-gray-800 text-white"
                  {...registerOtp('otp', { 
                    required: 'OTP is required', 
                    maxLength: { value: 6, message: 'OTP must be 6 digits' },
                    pattern: { value: /^[0-9]{6}$/, message: 'OTP must be a 6-digit number' }
                  })}
                />
                {getOtpErrorMessage('otp') && <p className="text-red-500 text-sm mt-1">{getOtpErrorMessage('otp')}</p>}
              </div>
              <button type="submit" className="mt-4 w-full py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
                Submit OTP
              </button>
            </form>
          </>
        ) : isCreatePasswordVisible ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">Create Your Password</h2>
            <form onSubmit={handleSubmitPassword(onPasswordSubmit)} className="space-y-4">
              <div>
                <input
                  type="password"
                  className="border rounded w-full p-2 bg-gray-800 text-white"
                  {...registerPassword('password', {
                    required: 'Password is required',
                    minLength: { value: 8, message: 'Password must be at least 8 characters' }
                  })}
                />
                {getPasswordErrorMessage('password') && <p className="text-red-500 text-sm mt-1">{getPasswordErrorMessage('password')}</p>}
              </div>
              <button type="submit" className="mt-4 w-full py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
                Set Password
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">Create your account</h2>
            {error && <p className="text-red-500 text-sm text-center">{error.general?.[0]}</p>}
            <form onSubmit={handleSubmitForm(onRegisterSubmit)}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-semibold">Name</label>
                <input
                  type="text"
                  id="name"
                  {...registerForm('name', { required: 'Name is required' })}
                  className="border rounded w-full p-2 bg-gray-800 text-white"
                />
                {getRegisterErrorMessage('name') && <p className="text-red-500">{getRegisterErrorMessage('name')}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold">Email</label>
                <input
                  type="email"
                  id="email"
                  {...registerForm('email', { required: 'Email is required' })}
                  className="border rounded w-full p-2 bg-gray-800 text-white"
                />
                {getRegisterErrorMessage('email') && <p className="text-red-500">{getRegisterErrorMessage('email')}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Date of Birth</label>
                <div className="flex space-x-4">
                <select
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      className="border rounded w-full p-2 bg-gray-800 text-white"
                      required
                  >
                      <option value="" disabled>Month</option>
                      {months.map((month) => (
                          <option key={month.value} value={month.value}>
                              {month.label}
                          </option>
                      ))}
                  </select>

                  <select
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="border rounded w-full p-2 bg-gray-800 text-white"
                    required
                  >
                    <option value="">Day</option>
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>

                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="border rounded w-full p-2 bg-gray-800 text-white"
                    required
                  >
                    <option value="">Year</option>
                    {Array.from({ length: 100 }, (_, i) => {
                      const currentYear = new Date().getFullYear();
                      return (
                        <option key={i} value={currentYear - i}>
                          {currentYear - i}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className={`mt-4 w-full py-2 rounded bg-blue-500 text-white ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Next'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
