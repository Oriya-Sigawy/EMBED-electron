import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination, Box } from '@mui/material';
import PatientContainer from '../patientContainer/PatientContainer';

type PatientSectionProps = {
  patientIds: string[];
  pageCount: number;
  pageIndex: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};

export default function PatientSection(props: PatientSectionProps) {
  const { patientIds, pageCount, pageIndex, handlePageChange } = props;
  const navigate = useNavigate();

  const goToPatientView = (patientId: string) => {
    navigate(`/patient/${patientId}`);
  };
  return (
    <Box id="patients-section-container" sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <Box id="patient-section-patients-container" sx={{ flexWrap: 'wrap', flexDirection: 'row', width: '100%' }}>
        {patientIds &&
          patientIds.map((patientId) => (
            <PatientContainer
              key={patientId}
              patientId={patientId}
              showPatientID={true}
              goToPatientView={goToPatientView}
            />
          ))}
      </Box>
      <Box sx={{ display: 'flex', position: 'fixed', right: 0, bottom: 6, m: 2 }}>
        <Pagination count={pageCount} page={pageIndex} onChange={handlePageChange} size="small" />
      </Box>
    </Box>
  );
}

// width: 1024,
// height: 768,
// minWidth: 1024,
// minHeight: 768,
