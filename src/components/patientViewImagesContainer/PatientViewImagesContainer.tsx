import React, { useState, useEffect, useCallback } from 'react';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CHANNELS } from '../../constants/common';
import { ContainerStyled, BoxStyled, ContentBoxStyled, ImageListStyled, TitleStyled } from './style';
import { SeriesMetadata } from 'types/image';
import ImageContainer from '../imageContainer/ImageContainer';
import { Details, PatientDetails } from 'types/patient';
import ImageDetails from '../imageDetails/ImageDetails';

type PatientContainerProps = {
  imageId: number;
};

const { EMBED_AGENT } = window;

export default function PatientViewImagesContainer(props: PatientContainerProps) {
  const { imageId } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [metadata, setMetadata] = useState<SeriesMetadata>();
  const [patientDetails, setPatientDetails] = useState<PatientDetails>();
  const [imageFormat, setImageFormat] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await EMBED_AGENT.send(CHANNELS.PATIENT_DETAILS, imageId);
      console.log('Raw patient details response:', response);
      const details: Details[] = response[imageId];
      console.log('Patient details for imageId', imageId, ':', details);

      const groupedDetails = details.reduce((groups, detail) => {
        const { ViewPosition, side } = detail;
        const key = `${ViewPosition}-${side}`;
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(detail);
        return groups;
      }, {});

      getImageMetadata(imageId);

      console.log(`Fetched patient details for imageId ${imageId}:`, groupedDetails);

      setPatientDetails(groupedDetails);
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
                {patientDetails && patientDetails[imageFormat] && (
                  <ImageDetails
                    anonymizedEMPI={patientDetails[imageFormat][0].anonymizedEMPI}
                    anonymizedAccessionNumber={patientDetails[imageFormat][0].anonymizedAccessionNumber}
                    tissuedensity={patientDetails[imageFormat][0].tissuedensity}
                    calcificationDistribution={patientDetails[imageFormat][0].calcificationDistribution}
                    type={patientDetails[imageFormat][0].type}
                    assessment={patientDetails[imageFormat][0].assessment}
                    massDensity={patientDetails[imageFormat][0].massDensity}
                    massMargins={patientDetails[imageFormat][0].massMargins}
                    massShape={patientDetails[imageFormat][0].massShape}
                    pathologySeverity={patientDetails[imageFormat][0].pathologySeverity}
                    num_roi={patientDetails[imageFormat][0].num_roi}
                    ViewPosition={''}
                    side={''}
                  />
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
