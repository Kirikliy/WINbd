import { yupResolver } from '@hookform/resolvers/yup';
import { object, boolean } from 'yup';
import { login, password } from '@/shared/lib/auth/validation';
import { SignInValues } from './types';
import { Resolver } from 'react-hook-form';

export const RESOLVER: Resolver<SignInValues> = yupResolver(
  object({
    login,
    password,
    rememberMe: boolean().default(true),
  })
);
