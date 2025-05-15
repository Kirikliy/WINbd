import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { logout } from '@/entities/user/model/actions';
import type { AppDispatch } from '@/app/store/types';
import { isAxiosError } from 'axios';

export const errorHandlerMiddleware: Middleware =
  ({ dispatch, getState }: MiddlewareAPI<AppDispatch>) =>
  next =>
  action => {
    if (isRejectedWithValue(action)) {
      if (isAxiosError(action.payload)) {
        const { response, status } = action.payload;
        const state = getState();

        if (status === 401 && state.user.authenticated) {
          dispatch(logout());
        } else if (Number.isInteger(status)) {
          console.error(response?.data);
        }
      } else {
        console.error(action.payload);
      }
    }

    return next(action);
  };

export default errorHandlerMiddleware;
