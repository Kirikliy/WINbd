import { Typography, Box, Button, Container, TextField, MenuItem, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useTranslation } from 'react-i18next';
import ArticlesPageContent from '@/pages/articles/ArticlesPageContent';
import { Link } from 'react-router-dom';
import PAGES from '@/app/consts/pages';
import { PagePager } from '@/shared/ui/styled';
import usersApi from '@/entities/user/api';
import { ChangeEvent, useCallback, useState } from 'react';
import { SearchParams } from '@/entities/article/api/types';
import { useDebounceFn } from '@/shared/lib/hooks/useDebounce';

const ArticlesPage = () => {
  const { t } = useTranslation();
  const { data: users } = usersApi.useGetQuery();
  const [params, setParams] = useState<SearchParams>({ title: '', author: '' });

  const changeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setParams({ ...params, title: e.target.value });
  }, []);

  const debouncedChangeTitle = useDebounceFn(changeTitle, 300);

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',

          flexWrap: 'wrap',
          gap: 2,
          alignItems: 'end',
          width: '100%',
          px: 1,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ margin: 0, marginRight: 'auto' }}
        >
          {t('articles')}
        </Typography>

        <TextField
          onChange={debouncedChangeTitle}
          variant="standard"
          size="small"
          label={t('articleTitle')}
          sx={{ width: 200 }}
        />
        <TextField
          onChange={e => setParams({ ...params, author: e.target.value })}
          select={!!users}
          sx={{
            width: 200,
            '& .MuiSelect-icon': {
              display: 'none',
            },
          }}
          InputProps={{
            endAdornment: params.author ? (
              <IconButton size="small">
                <ClearIcon fontSize="small" onClick={() => setParams({ ...params, author: '' })} />
              </IconButton>
            ) : undefined,
          }}
          variant="standard"
          size="small"
          label={t('author')}
          value={params.author}
        >
          {users?.map(user => (
            <MenuItem key={user._id} value={user._id}>
              {user.login}
            </MenuItem>
          ))}
        </TextField>
        <Button component={Link} to={PAGES.articles.create} variant="contained" size="small">
          {t('create')}
        </Button>
      </Box>

      <PagePager elevation={0}>
        <ArticlesPageContent searchParams={params} />
      </PagePager>
    </Container>
  );
};

export default ArticlesPage;
