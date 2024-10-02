// src/contracts/IUserService.ts
import { UserRequestDTO } from '../dtos/users/user-request-dto'; // Ensure proper casing in file names
import { UserResponseDTO } from '../dtos/users/user-response-dto'; // Ensure proper casing in file names

export interface IUserService {
    getAllUsers(): Promise<UserResponseDTO[]>; // Method to get all users
    getUserById(id: number): Promise<UserResponseDTO | null>; // Method to get a single user by ID
    createUser(userData: UserRequestDTO): Promise<UserResponseDTO>; // Method to create a new user
}
