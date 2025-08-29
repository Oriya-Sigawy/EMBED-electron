import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination, Box } from '@mui/material';
import PatientContainer from '../patientContainer/PatientContainer';
import { PatientSectionProps } from 'types/patient';

export default function PatientSection(props: PatientSectionProps) {
  const { imageIds: imageIds, pageCount, pageIndex, handlePageChange } = props;
  const navigate = useNavigate();

  const goToPatientView = (imageId: number) => {
    navigate(`/patient/${imageId}`);
  };

  return (
    <Box id="patients-section-container" sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <Box id="patient-section-patients-container" sx={{ flexWrap: 'wrap', flexDirection: 'row', width: '100%' }}>
        {imageIds &&
          imageIds.map((imageId) => (
            <PatientContainer
              key={imageId}
              imageId={imageId}
              showPatientID={true}
              goToPatientView={goToPatientView}
              imageFormat="full"
            />
          ))}
      </Box>
      <Box sx={{ display: 'flex', right: 0, bottom: 6, m: 2 }}>
        <Pagination count={pageCount} page={pageIndex} onChange={handlePageChange} size="small" />
      </Box>
    </Box>
  );
}
