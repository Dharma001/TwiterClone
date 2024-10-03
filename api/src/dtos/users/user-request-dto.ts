export interface UserRequestDTO {
  name: string;                   // User's name, required
  email: string;                  // User's email, required
  password?: string;              // User's password, optional (for updates)
  image?: string;                 // User's profile image, optional
  phone?: string;                 // User's phone number, optional
  isAdmin?: number;               // 0 = not admin, 1 = admin, optional (default 0)
  status?: number;                // 0 = inactive, 1 = active, optional (default 1)
  emailVerifiedAt?: Date | null;  // Email verification date, optional
  rememberToken?: string | null;  // Token for maintaining sessions, optional
}
