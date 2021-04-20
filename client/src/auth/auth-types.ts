import { User } from "../api/user";

export interface SignupValues {
  name: string;
  email: string;
  password: string;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface SessionResponse {
  user?: User;
  message: string;
}

export interface UserResponse {
  user: User;
}

export interface ResetPasswordValues {
  oldPassword?: string;
  newPassword: string;
}
