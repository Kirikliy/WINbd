import { IconButton, Badge, Alert, Chip } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { memo, useState, MouseEvent, use } from 'react';
import { useSelector } from '@/app/store';
import Menu from '@mui/material/Menu';
import { useTranslation } from 'react-i18next';

export const NotificationsButton = () => {
  const [shownCount, setShownCount] = useState(0);
  const notifications = useSelector(state => state.notifications);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();
  const newCount = notifications.length - shownCount;

  const handleClose = () => {
    setAnchorEl(null);

    setShownCount(notifications.length);
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (notifications.length === 0) return;

    setAnchorEl(e.currentTarget);
  };

  return (
    <>
      <IconButton color="inherit" size="large" onClick={handleClick}>
        <Badge
          badgeContent={newCount}
          color="secondary"
          invisible={shownCount === notifications.length}
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>
      {notifications.length > 0 && (
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{ maxHeight: 400, overflowY: 'auto', display: 'flex' }}
        >
          {notifications.toReversed().map((notification, index) => (
            <Alert
              sx={{ m: 1 }}
              key={index}
              severity={notification.type}
              action={index < newCount ? <Chip color={notification.type} label={t('new')} /> : null}
            >
              {notification.title}
            </Alert>
          ))}
        </Menu>
      )}
    </>
  );
};

export default memo(NotificationsButton);
