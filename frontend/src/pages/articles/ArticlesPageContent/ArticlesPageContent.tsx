import { Box, CircularProgress } from '@mui/material';
import articlesApi from '@/entities/article/api';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Props } from './types';
import ArticleCard from '@/pages/articles/ArticleCard';

const ArticlesPage = ({ searchParams }: Props) => {
  const { data, isFetching, error } = articlesApi.useGetQuery(searchParams);
  const { t } = useTranslation();

  if (isFetching) return <CircularProgress sx={{ alignSelf: 'center', mx: 'auto' }} />;

  if (error) return <Box sx={{ alignSelf: 'center', mx: 'auto' }}>{t('receivingError')}</Box>;

  if (!data || data.length === 0)
    return <Box sx={{ color: 'warning', alignSelf: 'center', mx: 'auto' }}>{t('listIsEmpty')}</Box>;

  return (
    <Box sx={{ width: '100%', display: 'grid', gap: 2, mt: 2 }}>
      {data.map(article => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </Box>
  );
};

export default memo(ArticlesPage);
