// This component is used to display image data and patient metadata for a given patientId. Specifically, it:
// -Fetches full, ROI, and cropped images via DDSM_AGENT.
// -Groups images and metadata by imageView and leftOrRightBreast.
// -Displays abnormalities and diagnostic info using the ImageDetails component.
// -Renders a list of image containers (thumbnails) for the patient.
// FIXME : change the channels's names if needed
// FIXME : I'm not sure what else to change here, look again.
import React, { useState, useEffect, useCallback } from 'react';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CHANNELS } from '../../constants/common';
import { ContainerStyled, BoxStyled, ContentBoxStyled, ImageListStyled, TitleStyled } from './style';
import { ImagesMetadata, Metadata, SeriesMetadata } from 'types/image';
import ImageContainer from '../imageContainer/ImageContainer';
import { Details, PatientDetails } from 'types/patient';
import ImageDetails from '../imageDetails/ImageDetails';

type PatientContainerProps = {
  patientId: string;
};

const { DDSM_AGENT } = window;

export default function PatientViewImagesContainer(props: PatientContainerProps) {
  const { patientId } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [metadata, setMetadata] = useState<ImagesMetadata>();
  const [patientDetails, setPatientDetails] = useState<PatientDetails>();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const fullImagesMetadata = await getImageMetadata(patientId, 'full');
      const roiImagesMetadata = await getImageMetadata(patientId, 'ROI');
      const croppedImagesMetadata = await getImageMetadata(patientId, 'cropped image');

      const groupedImages = groupByViewAndBreastSide([
        ...fullImagesMetadata,
        ...roiImagesMetadata,
        ...croppedImagesMetadata,
      ]);

      const response = await DDSM_AGENT.send(CHANNELS.PATIENT_DETAILS, patientId);
      const details: Details[] = response[patientId];

      const groupedDetails = details.reduce((groups, detail) => {
        const { imageView, leftOrRightBreast } = detail;
        const key = `${imageView}-${leftOrRightBreast}`;
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(detail);
        return groups;
      }, {});

      setPatientDetails(groupedDetails);
      setMetadata(groupedImages);
      setLoading(false);
    };
    getData();
  }, [props]);

  const getImageMetadata = useCallback(
    async (patientId: string, imageFormat: string) => {
      const data = {
        patientId: patientId,
        imageFormat: imageFormat || 'full',
      };

      const metadata: Metadata = await DDSM_AGENT.send(CHANNELS.PATIENT_IMAGES_DETAILS, data);
      return metadata.imagesMetadata;
    },
    [props]
  );

  const groupByViewAndBreastSide = (images) => {
    return images.reduce((groups, image: SeriesMetadata) => {
      const { imageView, leftOrRightBreast } = image;
      const key = `${imageView}-${leftOrRightBreast}`;
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
    <ContainerStyled id={`patient-container-${patientId}`}>
      {loading || !metadata ? (
        <CircularProgress />
      ) : (
        <>
          {metadata &&
            Object.keys(metadata).map((format) => (
              <BoxStyled key={format}>
                <TitleStyled id={`patient-title-${patientId}`}>{format.toUpperCase()}</TitleStyled>
                <ContentBoxStyled id={`${format}-content-container`}>
                  {patientDetails && patientDetails[format] && (
                    <ImageDetails
                      abnormalityId={patientDetails[format][0].abnormalityId}
                      abnormalityType={patientDetails[format][0].abnormalityType}
                      assessment={patientDetails[format][0].assessment}
                      breastDensity={patientDetails[format][0].breastDensity}
                      massMargins={patientDetails[format][0].massMargins}
                      massShape={patientDetails[format][0].massShape}
                      pathology={patientDetails[format][0].pathology}
                      subtlety={patientDetails[format][0].subtlety}
                      imageView={''}
                      leftOrRightBreast={''}
                    />
                  )}
                  <ImageListStyled cols={2}>
                    {format &&
                      metadata[format].map((seriesMetadata: SeriesMetadata) => {
                        return seriesMetadata.sopUIDs.map((sopUID) => {
                          return (
                            <ImageContainer
                              key={sopUID}
                              seriesUID={seriesMetadata.uid}
                              sopUID={sopUID}
                              seriesMetadata={seriesMetadata}
                              title={seriesMetadata.imageFormat.toUpperCase()}
                              goToImageView={goToImageView}
                            />
                          );
                        });
                      })}
                  </ImageListStyled>
                </ContentBoxStyled>
              </BoxStyled>
            ))}
        </>
      )}
    </ContainerStyled>
  );
}
