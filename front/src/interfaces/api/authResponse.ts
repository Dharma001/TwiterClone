export interface LoginResponse {
  message: string;
  status: string;
  token: string;
  statusCode: number;
  user: {
      id: number;
      email: string;
  };
}

export interface RegisterResponse {
  message: string;
  status: string;
  token: string;
  statusCode: number;
  user: {
      id: number;
      email: string;
  };
}

export interface OtpResponse {
  message: string;
  status: string;
  statusCode: number;
  user: {
      id: number;
      otp: string;
      email: string;
  };
}

export interface PasswordResponse {
  message: string;
  status: string;
  statusCode: number;
}