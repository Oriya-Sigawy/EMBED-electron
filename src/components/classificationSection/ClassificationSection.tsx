import React, { useEffect } from 'react';
import { BoxClassificationSectionStyled, DetailsBoxStyled } from './style';
import { CHANNELS } from '../../constants/common';
import { Details } from 'types/patient';
import { CircularProgress } from '@mui/material';
const { DDSM_AGENT } = window;

function DetailsComponent(props: Details) {
  return (
    <DetailsBoxStyled>
      <h6>{`Number of Abnormalities: ${props.abnormalityId}`}</h6>
      <h6>{`Abnormality Type: ${props.abnormalityType}`}</h6>
      <h6>{`Assessment: ${props.assessment}`}</h6>
      <h6>{`Breast Density: ${props.breastDensity}`}</h6>
      <h6>{`Mass Margins: ${props.massMargins}`}</h6>
      <h6>{`Mass Shape: ${props.massShape}`}</h6>
      <h6>{`Pathology: ${props.pathology}`}</h6>
      <h6>{`Subtlety: ${props.subtlety}`}</h6>
    </DetailsBoxStyled>
  );
}

export default function ClassificationSection(props: { patientId: string }) {
  const { patientId } = props;
  const [patientDetails, setPatientDetails] = React.useState<Details[]>();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const getPatientDetails = async () => {
      const response = await DDSM_AGENT.send(CHANNELS.PATIENT_DETAILS, patientId);
      const details: Details[] = response[patientId];
      setPatientDetails(details);
      setLoading(false);
    };
    getPatientDetails();
  }, [patientId]);

  return (
    <BoxClassificationSectionStyled>
      <h1>{`Patient ${patientId.split('_')[1]}`}</h1>
      {loading ? (
        <CircularProgress />
      ) : (
        <>{patientDetails && patientDetails.map((details, index) => <DetailsComponent key={index} {...details} />)}</>
      )}
    </BoxClassificationSectionStyled>
  );
}
