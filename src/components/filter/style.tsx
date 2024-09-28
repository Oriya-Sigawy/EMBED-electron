import { FormControl, InputLabel, styled } from '@mui/material';

export const FormControlStyled = styled(FormControl)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  marginTop: theme.spacing(2),
  padding: theme.spacing(1),
  overflow: 'scroll',
  width: '100%',
}));

export const InputLabelStyled = styled(InputLabel)(() => ({
  overflow: 'hidden',
  fontSize: 14,
}));
