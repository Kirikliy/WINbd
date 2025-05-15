import { Typography, Container, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PagePager } from '@/shared/ui/styled';
import ArticleForm, { ArticleSubmitValues } from '@/features/articles/ArticleForm';
import articlesApi from '@/entities/article/api';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';

const EditArticlePage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { data, isFetching } = articlesApi.useGetByIdQuery(id as string, { skip: !id });
  const [edit] = articlesApi.useEditMutation();

  const handleSubmit = useCallback(async (values: ArticleSubmitValues) => {
    if (!id) return;

    await edit({
      data: values,
      id,
    });
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('editArticle')}
      </Typography>
      <PagePager>
        {isFetching ? (
          <CircularProgress sx={{ alignSelf: 'center', mx: 'auto' }} />
        ) : (
          <ArticleForm onSubmit={handleSubmit} initialValues={data} submitTitle={t('edit')} />
        )}
      </PagePager>
    </Container>
  );
};

export default EditArticlePage;
