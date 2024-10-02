// src/dtos/users/UserResponseDTO.ts
export class UserResponseDTO {
  id: number;
  name: string;
  email: string;
  // createdAt: string; // Use a string for formatted date
  // updatedAt: string;

  constructor(user: any) {
      this.id = user.id;
      this.name = user.name;
      this.email = user.email;
      // this.createdAt = user.createdAt.toISOString(); // Convert to ISO string
      // this.updatedAt = user.updatedAt.toISOString();
  }
}
