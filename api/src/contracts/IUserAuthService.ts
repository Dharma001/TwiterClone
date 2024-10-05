import { UserRegisterRequestDTO } from '../dtos/users/auth/register-request-dto';
import { UserLoginRequestDTO } from '../dtos/users/auth/login-request-dto';
import { UserResponseDTO } from '../dtos/users/user-response-dto';
import { UserOtpRequestDTO } from '../dtos/users/auth/otp-request-dto';

export interface IUserAuthService {
    register(userData: UserRegisterRequestDTO): Promise<UserResponseDTO>;
    login(loginData: UserLoginRequestDTO): Promise<string>;
    verifyOtp(otpData: UserOtpRequestDTO): Promise<string>;
}
