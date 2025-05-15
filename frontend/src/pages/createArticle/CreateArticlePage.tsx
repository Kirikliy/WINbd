import { Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PagePager } from '@/shared/ui/styled';
import ArticleForm, { ArticleSubmitValues } from '@/features/articles/ArticleForm';
import articlesApi from '@/entities/article/api';
import { useCallback } from 'react';
import PAGES from '@/app/consts/pages';
import { useNavigate } from 'react-router-dom';

const CreateArticlePage = () => {
  const { t } = useTranslation();
  const [create] = articlesApi.useCreateMutation();
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (values: ArticleSubmitValues) => {
    const result = await create(values);

    if (result.data) navigate(`${PAGES.articles.edit}/${result.data._id}`);
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('articleCreation')}
      </Typography>
      <PagePager>
        <ArticleForm onSubmit={handleSubmit} submitTitle={t('create')} />
      </PagePager>
    </Container>
  );
};

export default CreateArticlePage;
