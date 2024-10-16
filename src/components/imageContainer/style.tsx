import { Box, ImageListItem, Typography, styled } from '@mui/material';

export const ContainerStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  borderColor: theme.palette.secondary.main,
  borderWidth: 4,
  margin: theme.spacing(1),
}));

export const TitleStyled = styled(Typography)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  fontSize: theme.typography.subtitle1.fontSize,
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightMedium,
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.contrastText,
}));

export const ImageListItemStyled = styled(ImageListItem)(() => ({
  overflow: 'hidden',
  justifyContent: 'center',
  borderRadius: 4,
  borderWidth: 1,
}));

export const ImageStyled = styled('img')({
  objectFit: 'scale-down',
  height: '250px',
});
