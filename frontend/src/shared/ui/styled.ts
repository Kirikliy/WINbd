import { Paper, styled } from '@mui/material';

export const PagePager = styled(Paper)`
  display: flex;
  padding: ${props => props.theme.spacing(2)};
  margin-top: ${props => props.theme.spacing(2)};
  margin-bottom: ${props => props.theme.spacing(2)};
  min-height: 300px;
`;
