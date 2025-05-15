import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/app/store/axiosBaseQuery';
import ENDPOINTS from '@/app/consts/endpoints';
import { CreateArticlePayload, EditArticlePayload } from './types';
import type { Article } from '@/entities/article/model/types';
import { SearchParams } from '@/entities/article/api/types';

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Article'],
  endpoints: builder => ({
    get: builder.query<Article[], SearchParams>({
      query: params => ({
        method: 'GET',
        url: ENDPOINTS.articles.get,
        params,
      }),
      providesTags: ['Article'],
    }),
    getById: builder.query<Article, string>({
      query: id => ({
        method: 'GET',
        url: ENDPOINTS.articles.getById.replace(':id', id),
      }),
      providesTags: ['Article'],
    }),
    remove: builder.mutation<Article, string>({
      query: id => ({
        method: 'POST',
        url: ENDPOINTS.articles.remove.replace(':id', id),
      }),
      invalidatesTags: ['Article'],
    }),
    edit: builder.mutation<Article, EditArticlePayload>({
      query: ({ data, id }) => ({
        data,
        method: 'POST',
        url: ENDPOINTS.articles.edit.replace(':id', id),
      }),
      invalidatesTags: ['Article'],
    }),
    create: builder.mutation<Article, CreateArticlePayload>({
      query: data => ({
        data,
        method: 'POST',
        url: ENDPOINTS.articles.create,
      }),
      invalidatesTags: ['Article'],
    }),
    publish: builder.mutation<void, string>({
      query: id => ({
        method: 'POST',
        url: ENDPOINTS.articles.publish.replace(':id', id),
      }),
      onQueryStarted: async (id: string, { dispatch, getState, queryFulfilled }) => {
        await queryFulfilled;

        const args = articlesApi.util.selectCachedArgsForQuery(getState(), 'get');

        for (let arg of args) {
          dispatch(
            articlesApi.util.updateQueryData('get', arg, draft =>
              draft.forEach(article => {
                if (article._id === id) {
                  article.isPublished = true;
                }
              })
            )
          );
        }
      },
    }),
  }),
});

export default articlesApi;
