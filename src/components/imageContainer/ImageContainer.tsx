// FIXME : change channels names if needed
import React, { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import { Button, CircularProgress } from '@mui/material';
import { ImageContainerProps, PatientImages } from 'types/image';
import { TitleStyled, ImageListItemStyled, ImageStyled, ContainerStyled } from './style';
import { CHANNELS } from '../../constants/common';

const { DDSM_AGENT } = window;

export default function ImageContainer(props: ImageContainerProps) {
  const { seriesUID, sopUID, seriesMetadata, title, goToImageView } = props;
  const [patientImage, setPatientImage] = useState<PatientImages>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPatientImages = async () => {
      // FIXME : need to put our unique key for each image
      const response = await DDSM_AGENT.send(CHANNELS.PATIENT_IMAGE, { seriesUID, sopUID });
      // FIXME : need to make sure that the response is in binary format
      const base64Image = Buffer.from(response, 'binary').toString('base64');
      const imageId = parseInt(sopUID.split('.').pop() as string);
      setPatientImage({
        id: imageId,
        seriesUID: seriesUID,
        sopUID: sopUID,
        class: seriesMetadata.class,
        imageView: seriesMetadata.imageView,
        leftOrRightBreast: seriesMetadata.leftOrRightBreast,
        imageFilePath: `data:image/jpeg;base64,${base64Image}`, 
      });

      setLoading(false);
    };
    getPatientImages();
  }, [props]);

  return (
    <ContainerStyled>
      {loading || !patientImage ? (
        <CircularProgress />
      ) : (
        <ImageListItemStyled>
          <TitleStyled variant="h6">
            {title ? title : `${patientImage.leftOrRightBreast} ${patientImage.imageView}`}
          </TitleStyled>
          {goToImageView ? (
            <Button key={sopUID} onClick={() => goToImageView(patientImage.imageFilePath)}>
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
