import React, { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import { CircularProgress } from '@mui/material';
import { PatientImages, SeriesMetadata } from 'types/image';
import { TitleStyled, ImageListItemStyled, ImageStyled } from './style';
import { CHANNELS } from '../../constants/common';

const { DDSM_AGENT } = window;

type ImageContainerProps = {
  seriesUID: string;
  sopUID: string;
  seriesMetadata: SeriesMetadata;
};

export default function ImageContainer(props: ImageContainerProps) {
  const { seriesUID, sopUID, seriesMetadata } = props;
  const [patientImage, setPatientImage] = useState<PatientImages>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPatientImages = async () => {
      const response = await DDSM_AGENT.send(CHANNELS.PATIENT_IMAGE, { seriesUID, sopUID });
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
    <>
      {loading || !patientImage ? (
        <CircularProgress />
      ) : (
        <ImageListItemStyled>
          <TitleStyled variant="h6">
            {patientImage.leftOrRightBreast} {patientImage.imageView}
          </TitleStyled>
          <ImageStyled src={patientImage.imageFilePath} loading="lazy" />
        </ImageListItemStyled>
      )}
    </>
  );
}
