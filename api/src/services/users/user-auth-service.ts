import { IUserAuthService } from '../../contracts/IUserAuthService';
import { UserRegisterRequestDTO } from '../../dtos/users/auth/register-request-dto';
import { UserLoginRequestDTO } from '../../dtos/users/auth/login-request-dto';
import { UserResponseDTO } from '../../dtos/users/user-response-dto';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendMail } from '../email-service';
import crypto from 'crypto';
import { UserOtpRequestDTO } from '../../dtos/users/auth/otp-request-dto';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

export class UserAuthService implements IUserAuthService {
    private generateOtp(): string {
        // return crypto.randomBytes(3).toString('hex').toUpperCase(); // uncomment this if you want to get in mail
        return '101010'
    }

    async register(userData: UserRegisterRequestDTO): Promise<UserResponseDTO> {
        try {
            const newUserData: any = {
                name: userData.name,
                email: userData.email,
                password:'default001'
            };

            if (userData.password) {
                const salt = await bcrypt.genSalt(10);
                newUserData.password = await bcrypt.hash(userData.password, salt);
            }

            const newUser = await prisma.user.create({
                data: newUserData,
            });

            const otp = this.generateOtp();

            const newOtpData: any = {
                email: userData.email,
                otp: otp,
            }
            await prisma.otp.create({
                data: newOtpData,
            });

            sendMail(newUser.email, 'Your OTP Code', 'otp', { otp });

            return new UserResponseDTO(newUser);
        } catch (error) {
            console.error('Error during registration:', error);
            throw new Error('Unable to register user. Please try again later.');
        }
    }

    async verifyOtp(otpData: UserOtpRequestDTO): Promise<string> {
        try {
            const otpEmail = await prisma.otp.findFirst({
                where: { email: otpData.email },
                orderBy: { created_at: 'desc' },
            });
    
            const user = await prisma.user.findUnique({
                where: { email: otpData.email },
            });
    
            if (!otpEmail || !user) {
                throw new Error('Invalid Credentials');
            }
    
            if (otpEmail) {
                await prisma.user.update({
                    where: { email: otpData.email },
                    data: {
                        email_verified_at: new Date(),
                    },
                });
    
                return 'OTP verified successfully!';
            } else {
                throw new Error('Invalid OTP provided.');
            }
        } catch (error) {
            console.error('Error during OTP verification:', error);
            throw new Error('Unable to verify OTP. Please check your credentials and try again.');
        }
    }

    async login(loginData: UserLoginRequestDTO): Promise<string> {
      try {
          const user = await prisma.user.findUnique({
              where: { email: loginData.email },
          });
  
          if (!user) {
              throw new Error('Invalid credentials');
          }
  
          const passwordMatch = await bcrypt.compare(loginData.password, user.password);
          if (!passwordMatch) {
              throw new Error('Invalid credentials');
          }
  
          if (user.email_verified_at) {
            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            return token;
        } else {
            throw new Error('Your account is not verified!!');
        }
      } catch (error) {
          console.error('Error during login:', error);
          throw new Error('Unable to login. Please check your credentials and try again.');
      }
  }  
}