import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/app/store/axiosBaseQuery';
import ENDPOINTS from '@/app/consts/endpoints';
import { AuthResponse, LoginPayload, RegisterPayload } from './types';
import { login, logout } from '@/entities/user/model/actions';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    login: builder.mutation<AuthResponse, LoginPayload>({
      query: ({ rememberMe, ...data }) => ({
        data,
        method: 'POST',
        url: ENDPOINTS.auth.login,
      }),
      onQueryStarted: async ({ rememberMe }, { dispatch, queryFulfilled }) => {
        const {
          data: { user },
        } = await queryFulfilled;

        dispatch(login(user, rememberMe));
      },
    }),
    register: builder.mutation<AuthResponse, RegisterPayload>({
      query: data => ({
        data,
        method: 'POST',
        url: ENDPOINTS.auth.register,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const {
          data: { user },
        } = await queryFulfilled;

        dispatch(login(user, true));
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        method: 'POST',
        url: ENDPOINTS.auth.logout,
      }),
      onQueryStarted: async (arg, { dispatch }) => {
        dispatch(logout());
      },
    }),
    getUser: builder.query<AuthResponse, void>({
      query: () => ({
        method: 'GET',
        url: ENDPOINTS.auth.user,
      }),
    }),
  }),
});

export default authApi;
