// src/dtos/users/UserResponseDTO.ts
export class UserResponseDTO {
  id: number;
  name: string;
  email: string;
  // createdAt: string;
  // updatedAt: string;

  constructor(user: any) {
      this.id = user.id;
      this.name = user.name;
      this.email = user.email;
      // this.createdAt = user.createdAt.toISOString();
      // this.updatedAt = user.updatedAt.toISOString();
  }
}
