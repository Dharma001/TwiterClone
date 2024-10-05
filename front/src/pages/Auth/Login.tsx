import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Loading from '../../components/common/Loading';
import useLoading from '../../hooks/useLoading';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { login, loading, error } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const isLoading = useSelector((state: RootState) => state.loading.isLoading); 

  const { isInitialLoading } = useLoading(1000);

  const onSubmit = async (data: FormData) => {
    await login(data.email, data.password);
  };

  if (isInitialLoading || isLoading) {
      return <Loading />;
  }
  return (
    <>      
      <div className="bg-black w-full h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </>
  );
};

export default Login;
