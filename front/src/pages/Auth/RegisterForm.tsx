import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/common/Loading';
import useLoading from '../../hooks/useLoading';
import { useAuth } from '../../hooks/useAuth';
import { useFormErrors } from '../../hooks/useFormErrors';

interface RegisterFormData {
  name: string;
  email: string;
}

interface OtpFormData {
  otp: string;
}

const AuthModal: React.FC = () => {
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  
  const { authRegister, verifyOtpCode, loading, error } = useAuth();
  const isLoadingGlobal = useSelector((state: RootState) => state.loading.isLoading);
  const { isInitialLoading } = useLoading(1000);
  
  const { register: registerForm, handleSubmit: handleSubmitForm, formState: { errors: registerErrors } } = useForm<RegisterFormData>();
  const { register: registerOtp, handleSubmit: handleSubmitOtp, formState: { errors: otpErrors }, reset: resetOtp } = useForm<OtpFormData>();

  const { getErrorMessage: getRegisterErrorMessage } = useFormErrors<RegisterFormData>(registerErrors, error);
  const { getErrorMessage: getOtpErrorMessage } = useFormErrors<OtpFormData>(otpErrors, error);

  const onRegisterSubmit = async (data: RegisterFormData) => {
    const registrationSuccess = await authRegister(data.name, data.email);
    if (registrationSuccess) {
      setEmail(data.email);
      setIsOtpVisible(true);
    }
  };

  const onOtpSubmit = async (data: OtpFormData) => {
    const verificationSuccess = await verifyOtpCode(data.otp, email);
    resetOtp();
    if (verificationSuccess) {
      // navigate(`/otp?email=${encodeURIComponent(email)}`)
    }
  };

  if (isInitialLoading || isLoadingGlobal || loading) {
    return <Loading />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-black text-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        {isOtpVisible ? (
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
