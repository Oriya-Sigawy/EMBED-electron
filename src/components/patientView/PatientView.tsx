import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button as MuiButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

export default function PatientView() {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const goToHome = () => {
    navigate(`/`);
  };

  const getPatientDetails = (patientId: string) => {
    return `Patient ID: ${patientId}`;
  };

  const patientDetails = getPatientDetails(patientId);

  return (
    <div>
      <MuiButton size="medium" onClick={goToHome}>
        <ArrowBack />
        Back
      </MuiButton>
      <h2>Patient {patientId.split('_')[1]}</h2>
      <div>{patientDetails}</div>
    </div>
  );
}
