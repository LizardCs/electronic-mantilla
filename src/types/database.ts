export interface User {
  id: number;
  email: string;
  password: string;
  created_at: string;
}

export interface LoginResponse {
  message: string;
  user: Omit<User, 'password'>;
}

export interface RegisterResponse {
  message: string;
  userId: number;
}