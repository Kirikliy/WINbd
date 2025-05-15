import React, { memo, FC } from 'react';
import { Container, CssBaseline, Box, Avatar, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Props } from './types';

export const AuthForm: FC<Props> = ({ children, onSubmit, title }) => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
          {children}
        </Box>
      </Box>
    </Container>
  );
};

export default memo(AuthForm);
