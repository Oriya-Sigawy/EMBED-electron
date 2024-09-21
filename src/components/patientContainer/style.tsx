import { Box, ImageList, ImageListItem, styled, Button } from '@mui/material';

export const ContainerStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  borderColor: theme.palette.secondary.main,
  borderWidth: 4,
  margin: theme.spacing(1),
}));

export const TitleButtonStyled = styled(Button)(({ theme }) => ({
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
  background: theme.palette.primary.light,
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.typography.h6.fontSize,
  color: theme.palette.primary.contrastText,
  borderRadius: 4,
  height: 50,
}));

export const ImageListStyled = styled(ImageList)({
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  borderRadius: 4,
  padding: 0,
  margin: 0,
  height: '80%',
});

export const ImageListItemStyled = styled(ImageListItem)({
  overflow: 'hidden',
  cursor: 'pointer',
  justifyContent: 'center',
  '&:hover': {
    boxShadow: '0 0 5px 2px rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
  },
});

export const ImageStyled = styled('img')({
  objectFit: 'scale-down',
  width: '100%',
  height: '100%',
  cursor: 'pointer',
});
