import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { CHANNELS } from '../../constants/common';
import { ContainerStyled, TitleButtonStyled, ImageListStyled } from './style';
import { ImageMetadata, Metadata } from 'types/image';
import ImageContainer from '../imageContainer/ImageContainer';

type PatientContainerProps = {
  patientId: string;
  showPatientID: boolean;
  goToPatientView: (patientId: string) => void;
};

const { DDSM_AGENT } = window;

export default function PatientContainer(props: PatientContainerProps) {
  const { patientId, showPatientID, goToPatientView } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [metadata, setMetadata] = useState<ImageMetadata>();
  const [imageCount, setImageCount] = useState<number>(0);

  useEffect(() => {
    const getMetadata = async (patientId: string) => {
      const metadata: Metadata = await DDSM_AGENT.send(CHANNELS.PATIENT_IMAGES_DETAILS, patientId);
      setMetadata(metadata.imagesMetadata);
      setImageCount(metadata.imageCount);
      setLoading(false);
    };

    getMetadata(patientId);
  }, [props]);

  return (
    <ContainerStyled id={`patient-container-${patientId}`}>
      {showPatientID && (
        <TitleButtonStyled id={`patient-title-${patientId}`} key={patientId} onClick={() => goToPatientView(patientId)}>
          Patient {patientId.split('_')[1]}
        </TitleButtonStyled>
      )}
      {loading || !metadata ? (
        <CircularProgress />
      ) : (
        <ImageListStyled cols={imageCount}>
          {metadata &&
            Object.keys(metadata).map((seriesUID) => {
              const seriesMetadata = metadata[seriesUID];
              return seriesMetadata.sopUIDs.map((sopUID) => {
                return (
                  <ImageContainer key={sopUID} seriesUID={seriesUID} sopUID={sopUID} seriesMetadata={seriesMetadata} />
                );
              });
            })}
        </ImageListStyled>
      )}
    </ContainerStyled>
  );
}
