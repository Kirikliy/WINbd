import { styled } from '@mui/material';
import BaseEditor from '@/shared/ui/Editor';

export const Form = styled('form')`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Editor = styled(BaseEditor)`
  border-radius: ${props => props.theme.spacing(1)};
  border: ${props => `1px solid ${props.theme.palette.grey[400]}`};
`;
