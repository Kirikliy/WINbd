import React, {memo} from 'react';
import {CircularProgress} from '@mui/material';
import {Page} from './styled';

export const PageLoading = () => <Page>{<CircularProgress />}</Page>;

export default memo(PageLoading);
