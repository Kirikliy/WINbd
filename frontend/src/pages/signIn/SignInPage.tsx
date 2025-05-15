import { useCallback, memo } from 'react';
import { TextField, FormControlLabel, Button, Grid, Checkbox } from '@mui/material';
import Link from '@/shared/ui/Link';
import AuthForm from '@/shared/ui/AuthForm';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import PAGES from '@/app/consts/pages';
import { useNavigate } from 'react-router';
import authApi from '@/shared/api/endpoints/auth';
import { RESOLVER } from './consts';
import { SignInValues } from './types';

export const SignInPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [login] = authApi.useLoginMutation();
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<SignInValues>({
    defaultValues: {
      login: '',
      password: '',
      rememberMe: true,
    },
    resolver: RESOLVER,
  });

  const submit = useCallback(async (values: SignInValues) => {
    const result = await login(values);

    if (result.data) navigate(PAGES.main);
  }, []);

  return (
    <AuthForm onSubmit={handleSubmit(submit)} title={t('signIn')}>
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
      <FormControlLabel
        control={
          <Controller
            control={control}
            name="rememberMe"
            render={({ field }) => <Checkbox checked={field.value} color="primary" {...field} />}
          />
        }
        label={t('rememberMe')}
      />
      <Button
        disabled={isSubmitting}
        fullWidth
        sx={{ mt: 3, mb: 2 }}
        type="submit"
        variant="contained"
      >
        {t('toSignIn')}
      </Button>
      <Grid container>
        <Grid>
          <Link to={PAGES.auth.signUp}>{t('toSignUp')}</Link>
        </Grid>
      </Grid>
    </AuthForm>
  );
};

export default memo(SignInPage);
