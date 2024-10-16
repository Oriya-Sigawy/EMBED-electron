import { Box, Typography, styled } from '@mui/material';

export const BoxStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  width: '100%',
  margin: theme.spacing(1),
}));

export const TitleStyled = styled(Typography)(({ theme }) => ({
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  padding: theme.spacing(1),
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.typography.h6.fontSize,
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.light,
  borderRadius: 12,
  height: 70,
}));
