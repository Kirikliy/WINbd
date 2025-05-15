import { memo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PAGES from '@/app/consts/pages';
import { useSelector } from '@/app/store/hooks';
import PageLoading from '@/shared/ui/PageLoading';
import authApi from '@/shared/api/endpoints/auth';
import Header from '@/shared/ui/Header';
import SocketManager from '@/app/providers/SocketManager';

export const AuthGuard = () => {
  const { authenticated, hasUser } = useSelector(store => ({
    authenticated: store.user.authenticated,
    hasUser: !!store.user.data,
  }));
  const { isLoading } = authApi.useGetUserQuery(undefined, { skip: !authenticated || hasUser });
  console.log(authenticated, hasUser);
  if (!authenticated) return <Navigate replace to={PAGES.auth.signIn} />;

  if (isLoading) return <PageLoading />;

  return (
    <>
      <SocketManager />
      <Header />
      <Outlet />
    </>
  );
};

export default memo(AuthGuard);
