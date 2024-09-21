import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import PatientContainer from '../patientContainer/PatientContainer';
import ClassificationSection from '../classificationSection/ClassificationSection';
import { BoxClassificationSectionStyled, BoxContentSectionStyled, BoxStyled } from './style';

export default function PatientView() {
  const { patientId } = useParams();
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
      <BoxStyled>
        <BoxClassificationSectionStyled>
          <ClassificationSection patientId={patientId} />
        </BoxClassificationSectionStyled>
        <BoxContentSectionStyled>
          <PatientContainer patientId={patientId} showPatientID={false} goToPatientView={() => {}} />
        </BoxContentSectionStyled>
      </BoxStyled>
    </>
  );
}
