import React from 'react';
import { useParams } from 'react-router-dom';

const getPatientDetails = (patientId: string) => {
  return `Patient ID: ${patientId}`;
};

export default function PatientView() {
  const { patientId } = useParams();

  const patientDetails = getPatientDetails(patientId);

  return (
    <div>
      <h2>Patient {patientId.split('_')[1]}</h2>
      <div>{patientDetails}</div>
    </div>
  );
}
