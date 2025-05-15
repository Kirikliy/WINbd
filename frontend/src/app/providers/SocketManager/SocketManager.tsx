import { memo, useEffect } from 'react';
import { useDispatch } from '@/app/store';
import { io } from 'socket.io-client';
import ENV from '@/app/consts/env';
import { useTranslation } from 'react-i18next';
import { addNotification } from '@/widgets/notifications/model';

export const SocketManager = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const socket = io(ENV.serverUrl);

    socket.on('articleCreated', article => {
      dispatch(
        addNotification({
          title: t('articleCreated', { title: article.title }),
          type: 'success',
        })
      );
    });

    socket.on('articleUpdated', article => {
      dispatch(
        addNotification({
          title: t('articleUpdated', { title: article.title }),
          type: 'success',
        })
      );
    });

    socket.on('articlePublished', article => {
      dispatch(
        addNotification({
          title: t('articlePublished', { title: article.title }),
          type: 'info',
        })
      );
    });

    socket.on('articleRemoved', article => {
      dispatch(
        addNotification({
          title: t('articleRemoved', { title: article.title }),
          type: 'error',
        })
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return null;
};

export default memo(SocketManager);
