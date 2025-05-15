import { AppThunk } from '@/app/store/types';
import { resetApp } from '@/app/store/actions';
import { userSlice } from './slice';
import { AUTH_KEY } from './consts';
import { User } from '@/entities/user/model/types';

export const login =
  (user: User, remember: boolean): AppThunk =>
  dispatch => {
    if (remember) localStorage.setItem(AUTH_KEY, String(true));

    dispatch(userSlice.actions.setUser(user));
  };

export const logout = (): AppThunk => dispatch => {
  localStorage.removeItem(AUTH_KEY);

  dispatch(resetApp());
};
