export interface UserRequestDTO {
  name: string;                   
  email: string;                  
  password?: string;             
  image?: string;                 
  phone?: string;                
  isAdmin?: number;               
  status?: number;               
  emailVerifiedAt?: Date | null; 
  rememberToken?: string | null; 
}
