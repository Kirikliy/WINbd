import { Article } from '@/entities/article/model/types';

export type ArticleFormValues = Pick<Article, 'title'>;

export type ArticleSubmitValues = Pick<Article, 'title' | 'content'>;

export type Props = {
  onSubmit: (values: ArticleSubmitValues) => void;
  initialValues?: ArticleSubmitValues;
  submitTitle: string;
};
