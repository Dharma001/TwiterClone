import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/common/Loading';
import useLoading from '../../hooks/useLoading';
import { useAuth } from '../../hooks/useAuth';
import { useFormErrors } from '../../hooks/useFormErrors';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = ({onClose}) => {
  const [isCreatePasswordVisible, setIsCreatePasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const { authLogin, VerifyUserEmailExists, loading, error } = useAuth();
  const isLoadingGlobal = useSelector((state: RootState) => state.loading.isLoading);
  const { isInitialLoading } = useLoading(1000);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { getErrorMessage } = useFormErrors<LoginFormData>(errors, error);

  const onVerifyEmailExistsSubmit = async (data: LoginFormData) => {
    const registrationSuccess = await VerifyUserEmailExists(data.email);
    if (registrationSuccess?.statusCode === 200) {
      setEmail(data.email);
      setIsCreatePasswordVisible(true);
    }
  };

  const onLoginSubmit = async (data: LoginFormData) => {
    const loginSuccess = await authLogin(data.email, data.password);
    if (loginSuccess?.statusCode === 200) {
      navigate('/');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleGoogleLogin = () => {
    const width = 500;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const popup = window.open(
      'http://localhost:5000/api/auth/google',
      'google-login',
      `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
    );

    const popupChecker = setInterval(() => {
      if (popup.closed) {
        clearInterval(popupChecker);
        console.log('Popup closed by user.');
      }
    }, 500);

    window.addEventListener('message', (event) => {
      if (event.origin === 'http://localhost:5000') {
        const { user } = event.data;

        if (user) {
          console.log('User authenticated:', user);

          const token = user.token;
          localStorage.setItem('token', token);

          window.location.href = '/';
        }
      }
    });
  };

  if (isInitialLoading || isLoadingGlobal || loading) {
    return <Loading />;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-70 flex -top-10 items-center justify-center">
      <div className="bg-black relative text-white rounded-xl shadow-lg w-11/12 max-w-lg">
        <button
            onClick={onClose}
          className="absolute top-2 z-50 left-2 text-white p-2 rounded"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24">
            <path fill="currentColor" d="M16.066 8.995a.75.75 0 1 0-1.06-1.061L12 10.939L8.995 7.934a.75.75 0 1 0-1.06 1.06L10.938 12l-3.005 3.005a.75.75 0 0 0 1.06 1.06L12 13.06l3.005 3.006a.75.75 0 0 0 1.06-1.06L13.062 12z" />
          </svg>
        </button>
        <div className="relative">
          <div className="flex items-center justify-center my-4">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 text-white">
              <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor" />
              </g>
            </svg>
          </div>

          <div className="px-10 lg:px-16 py-5">
            {isCreatePasswordVisible ? (
              <>
                <div className="mb-5">
                  <h2 className="text-[25px] font-semibold">You'll need a password</h2>
                  <p className='text-gray-400 text-[11px]'>Make sure it's 8 characters or more.</p>
                </div>
                <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-4">
                  <div className='space-y-5'>
                    <input
                      value={email}
                      className="placeholder:text-[14px] focus:outline-none focus:ring-none border-gray-700 rounded w-full px-2 text-sm py-[15px] bg-gray-900 bg-opacity-50 text-gray-400"
                      readOnly
                    />
                  <div className='relative'>
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      placeholder='Password'
                      className="border placeholder:text-[14px] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 border-gray-700 rounded w-full px-2 py-[11px] bg-black text-white"
                      {...register('password', {
                        required: 'Password is required',
                        minLength: { value: 8, message: 'Password must be at least 8 characters' }
                      })}
                    />
                  <div 
                    className="absolute right-3 top-3 cursor-pointer" 
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path fill="currentColor" d="M245.48 125.57c-.34-.78-8.66-19.23-27.24-37.81C201 70.54 171.38 50 128 50S55 70.54 37.76 87.76c-18.58 18.58-26.9 37-27.24 37.81a6 6 0 0 0 0 4.88c.34.77 8.66 19.22 27.24 37.8C55 185.47 84.62 206 128 206s73-20.53 90.24-37.75c18.58-18.58 26.9-37 27.24-37.8a6 6 0 0 0 0-4.88M128 194c-31.38 0-58.78-11.42-81.45-33.93A134.8 134.8 0 0 1 22.69 128a134.6 134.6 0 0 1 23.86-32.06C69.22 73.42 96.62 62 128 62s58.78 11.42 81.45 33.94A134.6 134.6 0 0 1 233.31 128C226.94 140.21 195 194 128 194m0-112a46 46 0 1 0 46 46a46.06 46.06 0 0 0-46-46m0 80a34 34 0 1 1 34-34a34 34 0 0 1-34 34"/></svg>
                    ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path fill="currentColor" d="M52.44 36a6 6 0 0 0-8.88 8l20.88 23c-37.28 21.9-53.23 57-53.92 58.57a6 6 0 0 0 0 4.88c.34.77 8.66 19.22 27.24 37.8C55 185.47 84.62 206 128 206a124.9 124.9 0 0 0 52.57-11.25l23 25.29a6 6 0 0 0 8.88-8.08Zm48.62 71.32l45 49.52a34 34 0 0 1-45-49.52M128 194c-31.38 0-58.78-11.42-81.45-33.93A134.6 134.6 0 0 1 22.69 128c4.29-8.2 20.1-35.18 50-51.91l20.2 22.21a46 46 0 0 0 61.35 67.48l17.81 19.6A113.5 113.5 0 0 1 128 194m6.4-99.4a6 6 0 0 1 2.25-11.79a46.17 46.17 0 0 1 37.15 40.87a6 6 0 0 1-5.42 6.53h-.56a6 6 0 0 1-6-5.45A34.1 34.1 0 0 0 134.4 94.6m111.08 35.85c-.41.92-10.37 23-32.86 43.12a6 6 0 1 1-8-8.94A134.1 134.1 0 0 0 233.31 128a134.7 134.7 0 0 0-23.86-32.07C186.78 73.42 159.38 62 128 62a120 120 0 0 0-19.69 1.6a6 6 0 1 1-2-11.83A131 131 0 0 1 128 50c43.38 0 73 20.54 90.24 37.76c18.58 18.58 26.9 37 27.24 37.81a6 6 0 0 1 0 4.88"/></svg>
                    )}
                  </div>
                  <p className="text-red-600 text-xs">{getErrorMessage('password')}</p>
                  </div>
                  </div>
                  <div className="space-y-4">
                  <button
                    type="submit"
                    className={`mt-32 w-full py-[10px] rounded-full text-[14px] font-bold bg-gray-400 hover:bg-white text-black ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                  >
                    {loading ? 'Registering...' : 'Log in'}
                  </button>
                  <p className='text-gray-400 text-[12px]'>Don't have an account? <span className='text-blue-500'>Sign up</span></p>
                  </div>
                </form>
              </>
            ) : (
              <>
              <div className="lg:px-20">
                <h2 className="text-[25px] font-semibold mb-6">Sign in to X</h2>
                <div className=" mt-2 lg:mt-7 space-y-4">
                  <button onClick={handleGoogleLogin} className='flex items-center gap-[3.5px] bg-white w-full py-[8.5px] justify-center text-gray-700 text-[12px] font-medium rounded-3xl'>
                    <img
                      alt=""
                      className='w-[17px] h-[17px]'
                      src="./assets/icons/google-icon.png"
                    />
                    Sing up with Google
                  </button>
                  <button className='flex items-center gap-[3.5px] bg-white w-full py-[8.5px] justify-center text-gray-800 text-[12px] font-bold rounded-3xl'>
                    <img
                      alt=""
                      className='w-[17px] h-[17px]'
                      src="./assets/icons/apple-icon.png"
                    />
                    Sing up with Apple
                  </button>
                </div>
                <div className="w-full my-2 flex items-center gap-[1px] justify-center">
                  <div className="w-1/2 border-b border-gray-800 h-1"></div>
                  <p className='text-gray-300 font-medium text-[14px]'>or</p>
                  <div className="w-1/2 border-b border-gray-800 h-1"></div>
                </div>
                <form onSubmit={handleSubmit(onVerifyEmailExistsSubmit)} className="space-y-4">
                  <div className='relative'>
                    <input
                      type="email"
                      placeholder='Phone , email or username'
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      className="border placeholder:text-[15px] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 border-gray-700 rounded w-full px-2 py-[11px] bg-black text-white"
                    />
                  </div>
                  <div className="space-y-5">
                    <button
                      type="submit"
                      className={`mt-3 w-full py-[6px] rounded-full text-[13px] font-bold bg-white text-black ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={loading}
                    >
                      {loading ? 'Registering...' : 'Next'}
                    </button>
                    <button className='flex items-center font-semibold border text-[13px] hover:bg-gray-100 hover:bg-opacity-5 border-gray-500 text-white w-full py-[5px] justify-center rounded-full'>
                      Forgot Password?
                    </button>
                  </div>
                  <div className="">
                    <p className='pb-20 pt-6 text-gray-400 text-[12px]'>Don't have an account? <span className='text-blue-500'>Sign up</span></p>
                  </div>
                </form>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center justify-center">
            {getErrorMessage('email') && (
              <p className="absolute -bottom-10 px-4 py-2 rounded-sm bg-blue-500 text-white text-xs">{getErrorMessage('email')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
