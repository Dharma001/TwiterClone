import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export const UserController = {
    getUsers: async (req: Request, res: Response) => {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve users' });
        }
    },
};
