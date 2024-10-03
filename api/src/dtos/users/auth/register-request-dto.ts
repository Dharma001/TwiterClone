export interface UserRegisterRequestDTO {
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
}
