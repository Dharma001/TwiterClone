import { IUserAuthService } from '../../contracts/IUserAuthService';
import { UserRegisterRequestDTO } from '../../dtos/users/auth/register-request-dto';
import { UserLoginRequestDTO } from '../../dtos/users/auth/login-request-dto';
import { UserResponseDTO } from '../../dtos/users/user-response-dto';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

export class UserAuthService implements IUserAuthService {
    async register(userData: UserRegisterRequestDTO): Promise<UserResponseDTO> {
        try {
            if (userData.password !== userData.confirmPassword) {
                throw new Error('Passwords do not match');
            }

            const newUserData: any = {
                name: userData.name,
                email: userData.email,
            };

            if (userData.password) {
              const salt = await bcrypt.genSalt(10);
              newUserData.password = await bcrypt.hash(userData.password, salt);
          }
            const newUser = await prisma.user.create({
                data: newUserData,
            });

            return new UserResponseDTO(newUser);
        } catch (error) {
            console.error('Error during registration:', error);
            throw new Error('Unable to register user. Please try again later.');
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
  
          const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  
          return token;
      } catch (error) {
          console.error('Error during login:', error);
          throw new Error('Unable to login. Please check your credentials and try again.');
      }
  }  
}
