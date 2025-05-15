import { RegisterPayload } from '@/shared/api/endpoints/auth/types';

export type SignUpValues = RegisterPayload & {
  confirmPassword: string;
};
