import React from 'react';
import { BoxClassificationSectionStyled } from './style';

export default function ClassificationSection(props: { patientId: string }) {
  const { patientId } = props;
  return <BoxClassificationSectionStyled>{`Patient ${patientId.split('_')[1]}`}</BoxClassificationSectionStyled>;
}
