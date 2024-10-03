// src/services/UserService.ts
import { IUserService } from '../contracts/IUserService';
import { UserRequestDTO } from '../dtos/users/user-request-dto';
import { UserResponseDTO } from '../dtos/users/user-response-dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserService implements IUserService {
    async getAllUsers(): Promise<UserResponseDTO[]> {
        try {
            const users = await prisma.user.findMany();
            return users.map(user => new UserResponseDTO(user));
        } catch (error) {
            console.error('Error fetching all users:', error);
            throw new Error('Unable to fetch users. Please try again later.');
        }
    }

    async getUserById(id: number): Promise<UserResponseDTO | null> {
        try {
            const user = await prisma.user.findUnique({ where: { id } });
            return user ? new UserResponseDTO(user) : null;
        } catch (error) {
            console.error(`Error fetching user with ID ${id}:`, error);
            throw new Error('Unable to fetch user. Please try again later.');
        }
    }

    async createUser(userData: UserRequestDTO): Promise<UserResponseDTO> {
        try {
            const newUser = await prisma.user.create({ data: userData })
            return new UserResponseDTO(newUser);
        } catch (error) {
            console.error('Error creating new user:', error);
            throw new Error('Unable to create user. Please try again later.')
        }
    }

    async getUserByEmail(email: string): Promise<UserResponseDTO | null> {
        const user = await prisma.user.findUnique({ where: { email } });
        return user ? new UserResponseDTO(user) : null;
    }
}
