import React, { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import { Button, CircularProgress } from '@mui/material';
import { ImageContainerProps, PatientImages } from 'types/image';
import { TitleStyled, ImageListItemStyled, ImageStyled, ContainerStyled } from './style';
import { CHANNELS } from '../../constants/common';

const { EMBED_AGENT } = window;

export default function ImageContainer(props: ImageContainerProps) {
  const { imageId, seriesMetadata, title, goToImageView } = props;
  const [patientImage, setPatientImage] = useState<PatientImages>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getPatientImages = async () => {
      console.log(`Fetching image ${imageId}...`);
      const response = await EMBED_AGENT.send(CHANNELS.PATIENT_IMAGE, { imageId });
      const base64Image = Buffer.from(response, 'binary').toString('base64');
      setPatientImage({
        id: imageId,
        ViewPosition: seriesMetadata.ViewPosition,
        side: seriesMetadata.side,
        imageFilePath: `data:image/jpeg;base64,${base64Image}`,
      });

      setLoading(false);
    };
    getPatientImages();
  }, [props]);

  // TODO: patientImage.side / .ViewPosition can be undefined here, handle that case
  return (
    <ContainerStyled>
      {loading || !patientImage ? (
        <CircularProgress />
      ) : (
        <ImageListItemStyled>
          {goToImageView ? (
            <Button key={imageId} onClick={() => goToImageView(patientImage.imageFilePath)}>
              <ImageStyled src={patientImage.imageFilePath} loading="lazy" />
            </Button>
          ) : (
            <ImageStyled src={patientImage.imageFilePath} loading="lazy" />
          )}
        </ImageListItemStyled>
      )}
    </ContainerStyled>
  );
}
