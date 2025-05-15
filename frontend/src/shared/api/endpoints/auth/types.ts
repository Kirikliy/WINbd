import { User } from '@/entities/user/model/types';

export type LoginPayload = {
  login: string;
  password: string;
  rememberMe: boolean;
};

export type AuthResponse = {
  user: User;
};

export type RegisterPayload = {
  login: string;
  password: string;
};
