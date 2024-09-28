import { Box, styled } from '@mui/material';

export const BoxClassificationSectionStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: theme.spacing(1),
  padding: theme.spacing(0),
}));

export const DetailsBoxStyled = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));
