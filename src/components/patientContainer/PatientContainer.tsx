// FIXME : change the channel's name if needed
import React, { useState, useEffect, useCallback } from 'react';
import { CircularProgress } from '@mui/material';
import { CHANNELS } from '../../constants/common';
import { ContainerStyled, TitleButtonStyled, ImageListStyled } from './style';
import { SeriesMetadata } from 'types/image';
import ImageContainer from '../imageContainer/ImageContainer';
import { PatientContainerProps } from 'types/patient';

const { DDSM_AGENT } = window;

export default function PatientContainer(props: PatientContainerProps) {
  const { imageId, showPatientID, goToPatientView, imageFormat } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [metadata, setMetadata] = useState<SeriesMetadata>();

  useEffect(() => {
    getImageMetadata(imageId);
  }, [props]);

  const getImageMetadata = useCallback(
    async (patientId: number) => {
      const data = {
        patientId: patientId,
        imageFormat: imageFormat || 'full',
      };

      const metadata: SeriesMetadata = await DDSM_AGENT.send(CHANNELS.PATIENT_IMAGES_DETAILS, data);
      setMetadata(metadata);
      setLoading(false);
    },
    [props]
  );

  return (
    <ContainerStyled id={`patient-container-${imageId}`}>
      {showPatientID && (
        <TitleButtonStyled id={`patient-title-${imageId}`} key={imageId} onClick={() => goToPatientView(imageId)}>
          Image {imageId}
        </TitleButtonStyled>
      )}
      {loading || !metadata ? (
        <CircularProgress />
      ) : (
        <ImageContainer
          imageId={imageId}
          seriesMetadata={metadata}

        />
      )}
    </ContainerStyled>
  );
}
