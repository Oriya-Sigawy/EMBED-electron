import React from 'react';
import { DetailsBoxStyled, BackgroundBoxStyled, BodyStyled } from './style';
import { Details } from 'types/patient';

//fixme - make sure you got all fields
export default function ImageDetails(props: Details) {
  console.log('Rendering ImageDetails with props:', props);
  return (
    <DetailsBoxStyled id={`details-container-${props.ViewPosition}-${props.side}`}>
      <BackgroundBoxStyled>
        {props.imageId !== undefined && (<BodyStyled>{`Image Id: ${props.imageId}`}</BodyStyled>)}
        {props.empiAnon !== undefined && (<BodyStyled>{`Anonymized EMPI: ${props.empiAnon}`}</BodyStyled>)}
        {props.accAnon !== undefined && (<BodyStyled>{`Anonymized Accession Number: ${props.accAnon}`}</BodyStyled>)}
        {props.tissueden !== undefined && (<BodyStyled>{`Tissue Density: ${props.tissueden}`}</BodyStyled>)}
        {props.calcdistri !== undefined && (<BodyStyled>{`Calcification Distribution: ${props.calcdistri}`}</BodyStyled>)}
        {props.type !== undefined && (<BodyStyled>{`Abnormality Type: ${props.type}`}</BodyStyled>)}
        {props.asses !== undefined && (<BodyStyled>{`Assessment: ${props.asses}`}</BodyStyled>)}
        {props.ViewPosition !== undefined && (<BodyStyled>{`View Position: ${props.ViewPosition}`}</BodyStyled>)}
        {props.side !== undefined && (<BodyStyled>{`Breast Side: ${props.side}`}</BodyStyled>)}
        {props.massdens !== undefined && (<BodyStyled>{`Breast Density: ${props.massdens}`}</BodyStyled>)}
        {props.massmargin !== undefined && (<BodyStyled>{`Mass Margins: ${props.massmargin}`}</BodyStyled>)}
        {props.massshape !== undefined && (<BodyStyled>{`Mass Shape: ${props.massshape}`}</BodyStyled>)}
        {props.pathSeverity !== undefined && (<BodyStyled>{`Pathology Severity: ${props.pathSeverity}`}</BodyStyled>)}
        {props.numRoi !== undefined && (<BodyStyled>{`Number of ROIs: ${props.numRoi}`}</BodyStyled>)}
      </BackgroundBoxStyled>
    </DetailsBoxStyled>
  );
}