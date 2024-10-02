// src/controllers/UserController.ts
import { Request, Response } from 'express';
import { IUserService } from '../contracts/IUserService';
import { UserService } from '../services/user-service';
import { UserRequestDTO } from '../dtos/users/user-request-dto';
import { UserResponseDTO } from '../dtos/users/user-response-dto';

const userService: IUserService = new UserService(); // Initialize UserService

export class UserController {
    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users: UserResponseDTO[] = await userService.getAllUsers(); // Fetch all users
            res.status(200).json(users); // Send users as response
        } catch (error) {
            console.error('Error in getAllUsers:', error);
            res.status(500).json({ message: 'Unable to fetch users. Please try again later.' }); // Send error response
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        const userId: number = parseInt(req.params.id); // Get user ID from request parameters

        try {
            const user: UserResponseDTO | null = await userService.getUserById(userId); // Fetch user by ID
            if (!user) {
                res.status(404).json({ message: 'User not found.' }); // Send not found response
                return;
            }
            res.status(200).json(user); // Send user as response
        } catch (error) {
            console.error(`Error in getUserById with ID ${userId}:`, error);
            res.status(500).json({ message: 'Unable to fetch user. Please try again later.' }); // Send error response
        }
    }

    async createUser(req: Request, res: Response): Promise<void> {
        const userData: UserRequestDTO = req.body; // Get user data from request body

        try {
            const newUser: UserResponseDTO = await userService.createUser(userData); // Create new user
            res.status(201).json(newUser); // Send created user as response
        } catch (error) {
            console.error('Error in createUser:', error);
            res.status(500).json({ message: 'Unable to create user. Please try again later.' }); // Send error response
        }
    }
}
