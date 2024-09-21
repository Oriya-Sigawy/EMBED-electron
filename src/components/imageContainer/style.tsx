import { ImageListItem, Typography, styled } from '@mui/material';

export const TitleStyled = styled(Typography)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  fontSize: theme.typography.subtitle1.fontSize,
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightMedium,
}));

export const ImageListItemStyled = styled(ImageListItem)(({ theme }) => ({
  overflow: 'hidden',
  cursor: 'pointer',
  justifyContent: 'center',
  borderRadius: 4,
  borderColor: theme.palette.primary.main,
  borderWidth: 1,
  backgroundColor: theme.palette.primary.light,
  '&:hover': {
    boxShadow: '0 0 5px 2px rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
  },
}));

export const ImageStyled = styled('img')({
  objectFit: 'scale-down',
  height: '250px',
  cursor: 'pointer',
});
