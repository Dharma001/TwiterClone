// src/services/UserService.ts
import { IUserService } from '../contracts/IUserService';
import { UserRequestDTO } from '../dtos/users/user-request-dto';
import { UserResponseDTO } from '../dtos/users/user-response-dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // Initialize Prisma Client

export class UserService implements IUserService {
    async getAllUsers(): Promise<UserResponseDTO[]> {
        try {
            const users = await prisma.user.findMany(); // Fetch all users from the database
            return users.map(user => new UserResponseDTO(user)); // Transform to DTOs
        } catch (error) {
            console.error('Error fetching all users:', error);
            throw new Error('Unable to fetch users. Please try again later.'); // Throw a custom error
        }
    }

    async getUserById(id: number): Promise<UserResponseDTO | null> {
        try {
            const user = await prisma.user.findUnique({ where: { id } });
            return user ? new UserResponseDTO(user) : null; // Transform to DTO or return null
        } catch (error) {
            console.error(`Error fetching user with ID ${id}:`, error);
            throw new Error('Unable to fetch user. Please try again later.'); // Throw a custom error
        }
    }

    async createUser(userData: UserRequestDTO): Promise<UserResponseDTO> {
        try {
            const newUser = await prisma.user.create({ data: userData }); // Create new user in the database
            return new UserResponseDTO(newUser); // Transform to DTO
        } catch (error) {
            console.error('Error creating new user:', error);
            throw new Error('Unable to create user. Please try again later.'); // Throw a custom error
        }
    }
}
