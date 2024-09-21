import { Autocomplete, InputLabel, MenuItem, styled } from '@mui/material';

export const AutocompleteStyled = styled(Autocomplete)(({ theme }) => ({
  display: 'flex',
  marginTop: theme.spacing(2),
  padding: theme.spacing(1),
  overflow: 'scroll',
  backgroundColor: theme.palette.background.default,
  scrollbarWidth: 'thin',
}));

export const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
  margin: theme.spacing(0),
  padding: theme.spacing(0),
  fontSize: theme.typography.body2.fontSize,
}));

export const InputLabelStyled = styled(InputLabel)(({ theme }) => ({
  overflow: 'hidden',
  margin: theme.spacing(0),
  padding: theme.spacing(0),
  fontSize: theme.typography.body2.fontSize,
}));
