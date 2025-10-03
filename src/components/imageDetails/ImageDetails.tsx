import React from 'react';
import { DetailsBoxStyled, BackgroundBoxStyled, BodyStyled } from './style';
import { Details } from 'types/patient';
import { FiltersMenuNames, AbnormalityFilterMenuNames } from '../../constants/filter.constant';

//fixme - make sure you got all fields
export default function ImageDetails(props: Details) {
  console.log('Rendering ImageDetails with props:', props);
  const nameDisplay = (value: any, field: string) => {
    const valueString = String(value);
    const name = FiltersMenuNames?.[field]?.[valueString] || AbnormalityFilterMenuNames?.[field]?.[valueString];
    if (name) {
      return `${valueString} - ${name}`;
    } else {
      return valueString;
    }
   };
  return (
    <DetailsBoxStyled id={`details-container-${props.ViewPosition}-${props.side}`}>
      <BackgroundBoxStyled>
        {props.imageId !== undefined && (<BodyStyled>{`Image Id: ${nameDisplay(props.imageId, 'imageId')}`}</BodyStyled>)}
        {props.empiAnon !== undefined && (<BodyStyled>{`Anonymized EMPI: ${nameDisplay(props.empiAnon, 'empiAnon')}`}</BodyStyled>)}
        {props.accAnon !== undefined && (<BodyStyled>{`Anonymized Accession Number: ${nameDisplay(props.accAnon, 'accAnon')}`}</BodyStyled>)}
        {props.tissueden !== undefined && (<BodyStyled>{`Tissue Density: ${nameDisplay(props.tissueden, 'tissueden')}`}</BodyStyled>)}
        {props.calcdistri !== undefined && (<BodyStyled>{`Calcification Distribution: ${nameDisplay(props.calcdistri, 'calcdistri')}`}</BodyStyled>)}
        {props.type !== undefined && (<BodyStyled>{`Abnormality Type: ${nameDisplay(props.type, 'type')}`}</BodyStyled>)}
        {props.asses !== undefined && (<BodyStyled>{`Assessment: ${nameDisplay(props.asses, 'asses')}`}</BodyStyled>)}
        {props.ViewPosition !== undefined && (<BodyStyled>{`View Position: ${nameDisplay(props.ViewPosition, 'ViewPosition')}`}</BodyStyled>)}
        {props.side !== undefined && (<BodyStyled>{`Breast Side: ${nameDisplay(props.side, 'side')}`}</BodyStyled>)}
        {props.massdens !== undefined && (<BodyStyled>{`Breast Density: ${nameDisplay(props.massdens, 'massdens')}`}</BodyStyled>)}
        {props.massmargin !== undefined && (<BodyStyled>{`Mass Margins: ${nameDisplay(props.massmargin, 'massmargin')}`}</BodyStyled>)}
        {props.massshape !== undefined && (<BodyStyled>{`Mass Shape: ${nameDisplay(props.massshape, 'massshape')}`}</BodyStyled>)}
        {props.pathSeverity !== undefined && (<BodyStyled>{`Pathology Severity: ${nameDisplay(props.pathSeverity, 'pathSeverity')}`}</BodyStyled>)}
        {props.numRoi !== undefined && (<BodyStyled>{`Number of ROIs: ${nameDisplay(props.numRoi, 'numRoi')}`}</BodyStyled>)}
      </BackgroundBoxStyled>
    </DetailsBoxStyled>
  );
}