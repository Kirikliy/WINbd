import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/app/store/axiosBaseQuery';
import ENDPOINTS from '@/app/consts/endpoints';
import { User } from '@/entities/user/model/types';

export const articlesApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    get: builder.query<User[], void>({
      query: () => ({
        method: 'GET',
        url: ENDPOINTS.users.get,
      }),
    }),
  }),
});

export default articlesApi;
