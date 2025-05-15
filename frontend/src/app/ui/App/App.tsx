import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthGuard from '@/app/providers/AuthGuard';
import AuthRedirect from '@/app/providers/AuthRedirect';
import PAGES from '@/app/consts/pages';
import { Navigate } from 'react-router-dom';
import SignInPage from '@/pages/signIn';
import SignUpPage from '@/pages/signUp';
import ArticlesPage from '@/pages/articles/ArticlesPage';
import ArticleCreatePage from '@/pages/createArticle/CreateArticlePage';
import ArticleEditPage from '@/pages/editArticle/EditArticlePage';
import ArticleViewPage from '@/pages/viewArticle/ArticleViewPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<AuthRedirect />}>
        <Route element={<SignInPage />} path={PAGES.auth.signIn} />
        <Route element={<SignUpPage />} path={PAGES.auth.signUp} />
      </Route>
      <Route element={<AuthGuard />}>
        <Route element={<ArticlesPage />} path={PAGES.main} />
        <Route element={<ArticleCreatePage />} path={PAGES.articles.create} />
        <Route element={<ArticleEditPage />} path={PAGES.articles.edit} />
        <Route element={<ArticleViewPage />} path={PAGES.articles.view} />
      </Route>
      <Route element={<Navigate replace to={PAGES.main} />} path="*" />
    </Routes>
  );
};

export default App;
