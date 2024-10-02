// src/routes/userRoutes.ts
import { Router } from 'express';
import { UserController } from '../controllers/user-controller';

const router = Router();
const userController = new UserController();

router.get('/users', userController.getAllUsers.bind(userController)); // Fetch all users
router.get('/users/:id', userController.getUserById.bind(userController)); // Fetch user by ID
router.post('/users', userController.createUser.bind(userController)); // Create a new user

export default router;
