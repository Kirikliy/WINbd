import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { memo } from 'react';

export const Link = (props: LinkProps) => <MuiLink component={RouterLink} {...props} />;

export default memo(Link);
