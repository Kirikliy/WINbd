import { Card, CardActions, Button, Chip, CardContent, CardHeader, Divider } from '@mui/material';
import { memo } from 'react';
import Editor from '@/shared/ui/Editor';
import { Link } from 'react-router-dom';
import PAGES from '@/app/consts/pages';
import { OutputData } from '@editorjs/editorjs';
import { Props } from './types';
import { useTranslation } from 'react-i18next';
import articlesApi from '@/entities/article/api';
import { useSelector } from '@/app/store';

const ArticleCard = ({ article }: Props) => {
  const { t } = useTranslation();
  const userId = useSelector(state => state.user.data?._id);
  const [remove, { isLoading: removing }] = articlesApi.useRemoveMutation();
  const [publish, { isLoading: publishing }] = articlesApi.usePublishMutation();

  return (
    <Card key={article._id}>
      <CardHeader
        title={article.title}
        subheader={article.author && `${t('author')}: ${article.author?.login}`}
        action={
          article.isPublished ? (
            <Chip label={t('published')} color="primary" variant="outlined" />
          ) : (
            <Button
              variant="outlined"
              size="small"
              disabled={publishing}
              loading={publishing}
              onClick={() => publish(article._id)}
            >
              {t('publish')}
            </Button>
          )
        }
      />
      <CardContent sx={{ maxHeight: 400, minHeight: 200, overflowY: 'auto' }}>
        <Editor onlyRead data={article.content as OutputData} />
      </CardContent>
      <Divider variant="middle" sx={{ mt: 2 }} />
      <CardActions sx={{ px: 3 }}>
        {article.author?._id === userId && (
          <>
            <Button
              color="error"
              size="small"
              disabled={removing}
              loading={removing}
              onClick={() => remove(article._id)}
            >
              {t('delete')}
            </Button>

            <Button
              component={Link}
              to={PAGES.articles.edit.replace(':id', article._id)}
              size="small"
              sx={{ marginLeft: 'auto !important' }}
            >
              {t('edit')}
            </Button>
          </>
        )}
        <Button component={Link} to={PAGES.articles.edit.replace(':id', article._id)} size="small">
          {t('view')}
        </Button>
      </CardActions>
    </Card>
  );
};

export default memo(ArticleCard);
