import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { BoxStyled, TitleStyled } from './style';
import PatientViewImagesContainer from '../patientViewImagesContainer/PatientViewImagesContainer';

export default function PatientView() {
  const { imageId } = useParams();
  const navigate = useNavigate();

  const goToHome = () => {
    navigate(`/`);
  };

  return (
    <>
      <Button size="medium" onClick={goToHome}>
        <ArrowBack />
        Back
      </Button>
      <TitleStyled variant="h5">{`Patient ${imageId}`}</TitleStyled>
      <BoxStyled>
        <PatientViewImagesContainer imageId={+imageId} />
      </BoxStyled>
    </>
  );
}
