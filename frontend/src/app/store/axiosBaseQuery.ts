import axios from '@/shared/api';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/react';
import type { QueryError } from './types';
import { AxiosRequestConfig } from 'axios';

/**
 * Декоратор для запросов [rtk-query](https://redux-toolkit.js.org/rtk-query/usage/customizing-queries) через axios
 *
 * @param {AxiosRequestConfig} customConfig - конфиг библиотеки axios
 * @returns {BaseQueryFn}
 */
export const axiosBaseQuery =
  (config?: AxiosRequestConfig): BaseQueryFn<AxiosRequestConfig, unknown, QueryError> =>
  async request => {
    try {
      const result = await axios({
        ...config,
        ...request,
        headers: {
          ...config?.headers,
          ...request.headers,
        },
      });

      return { data: result.data };
    } catch (error) {
      return {
        error: error as QueryError,
      };
    }
  };
