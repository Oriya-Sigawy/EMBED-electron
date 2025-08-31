import React from 'react';
import { DetailsBoxStyled, BackgroundBoxStyled, BodyStyled } from './style';
import { Details } from 'types/patient';

//fixme - make sure you got all fields
export default function ImageDetails(props: Details) {
  return (
    <DetailsBoxStyled id={`details-container-${props.ViewPosition}-${props.side}`}>
      <BackgroundBoxStyled>
        <BodyStyled>{`Number of Abnormalities: ${props.anonymizedEMPI}`}</BodyStyled>
        <BodyStyled>{`Accession Number: ${props.anonymizedAccessionNumber}`}</BodyStyled>
        <BodyStyled>{`Tissue Density: ${props.tissuedensity}`}</BodyStyled>
        <BodyStyled>{`Calcification Distribution: ${props.calcificationDistribution}`}</BodyStyled>
        <BodyStyled>{`Abnormality Type: ${props.type}`}</BodyStyled>
        <BodyStyled>{`Assessment: ${props.assessment}`}</BodyStyled>
        <BodyStyled>{`Breast Density: ${props.massDensity}`}</BodyStyled>
        <BodyStyled>{`Mass Margins: ${props.massMargins}`}</BodyStyled>
        <BodyStyled>{`Mass Shape: ${props.massShape}`}</BodyStyled>
        <BodyStyled>{`Pathology: ${props.pathologySeverity}`}</BodyStyled>
      </BackgroundBoxStyled>
    </DetailsBoxStyled>
  );
}