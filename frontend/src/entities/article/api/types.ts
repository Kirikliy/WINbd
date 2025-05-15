import { Article } from '@/entities/article/model/types';

export type CreateArticlePayload = Pick<Article, 'title' | 'content'>;

export type EditArticlePayload = {
  data: CreateArticlePayload;
  id: string;
};

export type SearchParams = {
  title: string;
  author: string;
};
