import { Request, Response } from 'express';
import { IUserAuthService } from '../contracts/IUserAuthService';
import { IUserService } from '../contracts/IUserService';
import { UserRegisterRequestDTO } from '../dtos/users/auth/register-request-dto';
import { UserLoginRequestDTO } from '../dtos/users/auth/login-request-dto';
import { UserResponseDTO } from '../dtos/users/user-response-dto';
import { ResponseHelper } from '../../helpers/response-helper';
import { validateUserRegistration } from '../validations/register-validation';
import { validateUserLogin } from '../validations/login-validation';
import { container } from '../di/container';
import { UserOtpRequestDTO } from '../dtos/users/auth/otp-request-dto';
import { validateUserOtp } from '../validations/otp-validation';

export class UserAuthController {
    private userAuthService: IUserAuthService;
    private userService: IUserService;

    constructor() {
        this.userAuthService = container.get<IUserAuthService>('IUserAuthService');
        this.userService = container.get<IUserService>('IUserService');
    }

    async register(req: Request, res: Response): Promise<void> {
        const userData: UserRegisterRequestDTO = req.body;

        const validation = await validateUserRegistration(userData, this.userService);
        
        if (!validation.valid) {
            const validationErrors = validation.errors ?? {};
            res.status(400).json(ResponseHelper.validationError(validationErrors));
            return;
        }

        try {
            const newUser: UserResponseDTO = await this.userAuthService.register(userData);
            res.status(201).json(ResponseHelper.success(newUser, 'User registered successfully'));
        } catch (error) {
            console.error('Error in register:', error);
            res.status(500).json(ResponseHelper.error('Unable to register user. Please try again later.'));
        }
    }

    async verifyOtp(req: Request, res: Response): Promise<void> {
        const otpData: UserOtpRequestDTO = req.body;
    
        const validation = await validateUserOtp(otpData, this.userService);
    
        if (!validation.valid) {
            const validationErrors = validation.errors ?? {};
            res.status(400).json(ResponseHelper.validationError(validationErrors));
            return;
        }
    
        try {
            const otp: string = await this.userAuthService.verifyOtp(otpData);
            res.status(200).json(ResponseHelper.success({ otp }, 'Verified successfully'));
        } catch (error) {
            console.error('Error while verifying otp:', error);
            res.status(401).json(ResponseHelper.error('Invalid email or OTP'));
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        const loginData: UserLoginRequestDTO = req.body;

        const validation = await validateUserLogin(loginData);

        if (!validation.valid) {
            const validationErrors = validation.errors ?? {};
            res.status(400).json(ResponseHelper.validationError(validationErrors));
            return;
        }

        try {
            const token: string = await this.userAuthService.login(loginData);
            res.status(200).json(ResponseHelper.success({ token }, 'Login successful'));
        } catch (error) {
            console.error('Error in login:', error);
            res.status(401).json(ResponseHelper.error('Invalid email or password.'));
        }
    }
}
