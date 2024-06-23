import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import { CHANNELS } from '../../../electron/constants/common';
import { ImageListItemBar } from '@mui/material';
import { ContainerStyled, TitleStyled, ImageListStyled, ImageListItemStyled, ImageStyled } from './style';
import { ImageMetadata, PatientImages } from 'types/image';

type PatientContainerProps = {
  patientId: string;
};

const { DDSM_AGENT } = window;

export default function PatientContainer(props: PatientContainerProps) {
  const { patientId } = props;
  const [patientImages, setPatientImages] = useState<PatientImages[]>();

  useEffect(() => {
    const getPatientImages = async (patientId: string) => {
      const imagesMetadata: ImageMetadata = await DDSM_AGENT.send(CHANNELS.PATIENT_IMAGES_DETAILS, patientId);

      const imagePromises: PatientImages[] = [];
      for (const seriesUID in imagesMetadata) {
        const seriesMetadata = imagesMetadata[seriesUID];

        for (const sopUID of seriesMetadata.sopUIDs) {
          const response = await DDSM_AGENT.send(CHANNELS.PATIENT_IMAGE, { seriesUID, sopUID });
          const base64Image = Buffer.from(response, 'binary').toString('base64');
          imagePromises.push({
            class: seriesMetadata.class,
            imageView: seriesMetadata.imageView,
            leftOrRightBreast: seriesMetadata.leftOrRightBreast,
            image: `data:image/jpeg;base64,${base64Image}`,
          });
        }
      }

      const images = await Promise.all(imagePromises);
      const sortedImages = images.sort(
        (a, b) => a.leftOrRightBreast.localeCompare(b.leftOrRightBreast) && a.imageView.localeCompare(b.imageView)
      );
      setPatientImages(sortedImages);
    };
    getPatientImages(patientId);
  }, [props]);

  return (
    <ContainerStyled>
      <TitleStyled key={patientId}>Patient {patientId.split('_')[1]}</TitleStyled>
      <ImageListStyled cols={patientImages?.length}>
        {patientImages &&
          patientImages.map((image, index) => (
            <ImageListItemStyled key={index}>
              <ImageListItemBar title={`${image.leftOrRightBreast} ${image.imageView}`} position="top" />
              <ImageStyled src={image.image} alt={`Image ${index}`} loading="lazy" />
            </ImageListItemStyled>
          ))}
      </ImageListStyled>
    </ContainerStyled>
  );
}
