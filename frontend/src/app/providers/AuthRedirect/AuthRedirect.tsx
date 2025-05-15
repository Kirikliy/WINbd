import { memo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PAGES from '@/app/consts/pages';
import { useSelector } from '@/app/store/hooks';

export const AuthRedirect = () => {
  const authenticated = useSelector(store => store.user.authenticated);

  return !authenticated ? <Outlet /> : <Navigate replace to={PAGES.main} />;
};

export default memo(AuthRedirect);
