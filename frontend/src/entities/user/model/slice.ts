import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import authApi from '@/shared/api/endpoints/auth';
import { User, UserState } from './types';
import { AUTH_KEY } from './consts';

export const userSlice = createSlice({
  initialState: () =>
    ({
      data: null,
      authenticated: localStorage.getItem(AUTH_KEY) === 'true',
    }) as UserState,
  name: 'user',
  extraReducers: builder => {
    builder.addMatcher(authApi.endpoints.getUser.matchFulfilled, (state, action) => {
      state.data = action.payload.user;
      state.authenticated = true;
    });
  },
  reducers: {
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.data = payload;
      state.authenticated = true;
    },
    setAuthenticated(state, { payload }: PayloadAction<boolean>) {
      state.authenticated = payload;
    },
  },
});

export default userSlice;
