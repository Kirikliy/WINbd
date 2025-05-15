import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { memo } from 'react';

export const Link = (props: LinkProps & MuiLinkProps) => (
  <MuiLink component={RouterLink} {...props} />
);

export default memo(Link);
