import { FormControl, InputLabel, styled } from '@mui/material';

export const BoxStyled = styled(FormControl)(({ theme }) => ({
  display: 'flex',
  marginTop: theme.spacing(2),
  padding: theme.spacing(1),
  overflow: 'scroll',
}));

export const InputLabelStyled = styled(InputLabel)(({ theme }) => ({
  overflow: 'hidden',
  fontSize: 14,
}));
