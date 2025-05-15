import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { object, string } from 'yup';
import { password, login } from '@/shared/lib/auth/validation';
import i18n from '@/app/lib/i18n';
import { Resolver } from 'react-hook-form';
import { SignUpValues } from './types';

export const confirmPassword = string()
  .required(i18n.t('requiredField'))
  .test(
    'equal',
    i18n.t('passwordDoesNotMatch'),
    (value, context) => value === context.parent.password
  );

export const RESOLVER: Resolver<SignUpValues> = yupResolver(
  object({
    login,
    password,
    confirmPassword,
  })
);
