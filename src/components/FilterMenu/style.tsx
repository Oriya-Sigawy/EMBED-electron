import { Box, Typography, styled } from '@mui/material';

export const BoxStyled = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1),
}));

export const TitleStyled = styled(Typography)(({ theme }) => ({
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  padding: theme.spacing(1),
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.typography.h6.fontSize,
  color: theme.palette.primary.dark,
  height: 70,
}));
