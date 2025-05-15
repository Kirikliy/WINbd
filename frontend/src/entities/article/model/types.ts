import { User } from '@/entities/user/model/types';

export type ArticleContent = {
  version?: string;
  time?: number;
  blocks: unknown[];
};

export type Article = {
  _id: string;
  isPublished: boolean;
  content: ArticleContent;
  title: string;
  author?: User;
};
