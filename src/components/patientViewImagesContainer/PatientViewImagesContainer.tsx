import React, { useState, useEffect, useCallback } from 'react';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CHANNELS } from '../../constants/common';
import { ContainerStyled, BoxStyled, ContentBoxStyled, ImageListStyled, TitleStyled } from './style';
import { SeriesMetadata } from 'types/image';
import ImageContainer from '../imageContainer/ImageContainer';
import { Details } from 'types/patient';
import ImageDetails from '../imageDetails/ImageDetails';

type PatientContainerProps = {
  imageId: number;
};

const { EMBED_AGENT } = window;

export default function PatientViewImagesContainer(props: PatientContainerProps) {
  const { imageId } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [metadata, setMetadata] = useState<SeriesMetadata>();
  const [patientDetails, setPatientDetails] = useState<Details>();
  const [imageFormat, setImageFormat] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const details: Details = await EMBED_AGENT.send(CHANNELS.PATIENT_DETAILS, imageId);
      console.log(details);
      console.log(typeof details);
      getImageMetadata(imageId);
      setPatientDetails(details);
      setLoading(false);
    };
    getData();
  }, [props]);

  const getImageMetadata = useCallback(
      async (imageId: number) => {
        const data = {
          imageId,
          imageFormat: imageFormat || 'full',
        };
  
        console.log('Fetching metadata for imageId:', imageId, 'with format:', data.imageFormat);
        const metadata: SeriesMetadata = await EMBED_AGENT.send(CHANNELS.PATIENT_IMAGES_DETAILS, data);
        setMetadata(metadata);
        setImageFormat(data.imageFormat);
        setLoading(false);
      },
      [props]
    );

  const groupByViewAndBreastSide = (images) => {
    return images.reduce((groups, image: SeriesMetadata) => {
      const { ViewPosition, side } = image;
      const key = `${ViewPosition}-${side}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(image);
      return groups;
    }, {});
  };

  const goToImageView = async (imageFilePath: string) => {
    navigate(`/imageView`, { state: { imageFilePath: imageFilePath } });
  };

  return (
    <ContainerStyled id={`patient-container-${imageId}`}>
      {loading || !metadata ? (
        <CircularProgress />
      ) : (
        <>
          {
            <BoxStyled key={imageFormat}>
              <TitleStyled id={`patient-title-${imageId}`}>{imageFormat.toUpperCase()}</TitleStyled>
              <ContentBoxStyled id={`${imageFormat}-content-container`}>
                {patientDetails && (
                  <ImageDetails {...patientDetails} />
                )}
                <ImageContainer
                  imageId={imageId}
                  seriesMetadata={metadata}
                />
              </ContentBoxStyled>
            </BoxStyled>
          }
        </>
      )}
    </ContainerStyled>
  );
}
