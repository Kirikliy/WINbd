import { memo, useCallback } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import Link from '@/shared/ui/Link';
import AuthForm from '@/shared/ui/AuthForm';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useTranslation } from 'react-i18next';
import PAGES from '@/app/consts/pages';
import { useNavigate } from 'react-router';
import authApi from '@/shared/api/endpoints/auth';
import { RESOLVER } from './consts';
import { SignUpValues } from './types';

export const SignUpPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [signUp] = authApi.useRegisterMutation();
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<SignUpValues>({
    defaultValues: {
      login: '',
      password: '',
      confirmPassword: '',
    },
    resolver: RESOLVER,
  });

  const submit = useCallback(async (values: SignUpValues) => {
    const { confirmPassword, ...payload } = values;

    const result = await signUp(payload);

    if (result.data) navigate(PAGES.main);
  }, []);

  return (
    <AuthForm onSubmit={handleSubmit(submit)} title={t('signUp')}>
      <Grid container spacing={2}>
        <Controller
          control={control}
          name="login"
          render={({ field, fieldState }) => (
            <TextField
              autoFocus
              error={!!fieldState.error}
              fullWidth
              helperText={<ErrorMessage errors={errors} name={field.name} />}
              label={t('login')}
              margin="normal"
              required
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <TextField
              error={!!fieldState.error}
              fullWidth
              helperText={<ErrorMessage errors={errors} name={field.name} />}
              label={t('password')}
              margin="normal"
              required
              type="password"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <TextField
              error={!!fieldState.error}
              fullWidth
              helperText={<ErrorMessage errors={errors} name={field.name} />}
              label={t('reenterPassword')}
              margin="normal"
              required
              type="password"
              {...field}
            />
          )}
        />
      </Grid>
      <Button
        disabled={isSubmitting}
        fullWidth
        sx={{ mt: 3, mb: 2 }}
        type="submit"
        variant="contained"
      >
        {t('toSignUp')}
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid>
          <Link to={PAGES.auth.signIn}>{t('toSignIn')}</Link>
        </Grid>
      </Grid>
    </AuthForm>
  );
};

export default memo(SignUpPage);
