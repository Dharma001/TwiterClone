// src/services/UserAuthService.ts

import { IUserAuthService } from '../../contracts/IUserAuthService';
import { UserRegisterRequestDTO } from '../../dtos/users/auth/register-request-dto';
import { UserLoginRequestDTO } from '../../dtos/users/auth/login-request-dto';
import { UserResponseDTO } from '../../dtos/users/user-response-dto';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Use a secure secret in production

export class UserAuthService implements IUserAuthService {
    async register(userData: UserRegisterRequestDTO): Promise<UserResponseDTO> {
        try {
            // Check if passwords match
            if (userData.password !== userData.confirmPassword) {
                throw new Error('Passwords do not match');
            }

            // Prepare user data with only name, email, and password
            const newUserData: any = {
                name: userData.name,
                email: userData.email,
            };

            // Hash the password
            if (userData.password) {
              const salt = await bcrypt.genSalt(10);
              newUserData.password = await bcrypt.hash(userData.password, salt);
          }
            // Create the user in the database using Prisma
            const newUser = await prisma.user.create({
                data: newUserData,
            });

            // Return the newly created user
            return new UserResponseDTO(newUser);
        } catch (error) {
            console.error('Error during registration:', error);
            throw new Error('Unable to register user. Please try again later.');
        }
    }

    async login(loginData: UserLoginRequestDTO): Promise<string> {
      try {
          // Find user by email
          const user = await prisma.user.findUnique({
              where: { email: loginData.email },
          });
  
          // Check if user exists
          if (!user) {
              throw new Error('Invalid credentials'); // Return a generic error if user not found
          }
  
          // Check if the provided password matches the stored hashed password
          const passwordMatch = await bcrypt.compare(loginData.password, user.password);
          if (!passwordMatch) {
              throw new Error('Invalid credentials'); // Return a generic error if password does not match
          }
  
          // Generate JWT token
          const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  
          return token; // Return the generated token
      } catch (error) {
          console.error('Error during login:', error);
          throw new Error('Unable to login. Please check your credentials and try again.'); // Handle login error
      }
  }  
}
