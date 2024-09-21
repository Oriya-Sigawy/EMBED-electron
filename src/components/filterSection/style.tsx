import { Box, styled } from '@mui/material';

export const BoxFilterSectionStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  margin: theme.spacing(1),
  padding: theme.spacing(0),
}));

export const BoxFilterMenuStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '50%',
}));

export const BoxOthersMenuStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '50%',
}));
