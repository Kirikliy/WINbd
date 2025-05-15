import { Typography, Container, CircularProgress, Skeleton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PagePager } from '@/shared/ui/styled';
import articlesApi from '@/entities/article/api';
import { useParams } from 'react-router-dom';
import Editor from '@/shared/ui/Editor';
import { OutputData } from '@editorjs/editorjs';

const ViewArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isFetching } = articlesApi.useGetByIdQuery(id as string, { skip: !id });

  if (isFetching) {
    return (
      <Container>
        <Skeleton variant="text" width="100%" height={60} sx={{ mb: 2 }} />
        <Skeleton variant="rounded" width="100%" height={400} />
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {data?.title}
      </Typography>
      <PagePager>
        <Editor data={data?.content as OutputData} />
      </PagePager>
    </Container>
  );
};

export default ViewArticlePage;
