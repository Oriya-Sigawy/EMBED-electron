// FIXME : change names
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { CircularProgress } from '@mui/material';
import { AbnormalityFilterObject, FilterObject, PatientFilterObject } from '../../types/filter';
import { CHANNELS } from '../../constants/common';
import FilterSection from '../filterSection/FilterSection';
import PatientSection from '../patientsSection/PatientsSection';
import { BoxStyled, BoxFilterSectionStyled, BoxContentSectionStyled } from './style';
import MenuDrawer from '../menuDrawer/MenuDrawer';
import { useLocation } from 'react-router-dom';

const { DDSM_AGENT } = window;    //Electron’s IPC (Inter-Process Communication) that enables the frontend React code to send messages to the Electron backend. defines in preloads.ts

export default function Home() {
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);
  const [filtersMenuOptions, setFiltersMenuOptions] = useState<FilterObject>();
  const [abnormalityFilterMenuOptions, setAbnormalityFilterMenuOptions] = useState<AbnormalityFilterObject>();
  const [patientIdsFilterMenuOptions, setPatientIdsFilterMenuOptions] = useState<PatientFilterObject>();
  const [patientsIds, setPatientsIds] = useState<string[]>();
  const [pageIndex, setPageIndex] = useState<number>(1);

  const initialFilters = location.state?.filters;

  useEffect(() => {
    if (initialFilters) {
      onApplyFilter(initialFilters);
    }
  }, [initialFilters]);

  useEffect(() => {
    const getFilterOptions = async () => {
      console.log("Fetching filter options...");
      const response = await DDSM_AGENT.send(CHANNELS.FILTER_OPTIONS);
      const options: FilterObject = JSON.parse(response);     //backend is returning JSON strings
      console.log("Response for filter options: ", options);
      setFiltersMenuOptions(options);
    };

    const getAbnormalityFilterOptions = async () => {
      console.log("Fetching abnormality filter options...");
      const response = await DDSM_AGENT.send(CHANNELS.ABNORMALITY_FILTER_OPTIONS);
      const options: AbnormalityFilterObject = JSON.parse(response);   //backend is returning JSON string
      console.log("Response for abnormality filter options: ", options);
      setAbnormalityFilterMenuOptions(options);
    };

    // change to imageId
    const getPatientOptions = async () => {
      console.log("Fetching patient IDs filter options...");
      const response = await DDSM_AGENT.send(CHANNELS.PATIENT_IDS);
      const options: PatientFilterObject = JSON.parse(response);   
      setPatientIdsFilterMenuOptions(options);
      console.log("Response for patient IDs filter options: ", options);
      if (!patientsIds && options.patientsIds) {
        setPatientsIds(options.patientsIds);
      }
      setLoading(false);
    };

    getFilterOptions();
    getAbnormalityFilterOptions();
    getPatientOptions();
  }, []);

  const onApplyFilter = useCallback(async (filters) => {
    const response = await DDSM_AGENT.send(CHANNELS.FILTER_PATIENTS, filters);
    const patients: PatientFilterObject = JSON.parse(response);   //backend is returning JSON string
    setPatientsIds(patients.patientsIds);
  }, []);

  const handlePageChange = useCallback((event, value) => {
    setPageIndex(value);
  }, []);

  const pageCount = useMemo(() => {
    return Math.ceil(patientsIds?.length / 2) || 1;
  }, [patientsIds]);

  const currentPatients = useMemo(() => {
    const index = (pageIndex - 1) * 2;    //assuming 2 patients per page, need to change it to match our DB. maybe need another unique identifier for patients
    return patientsIds?.slice(index, index + 2);
  }, [patientsIds, pageIndex, handlePageChange]);

  return (
    <>
      <MenuDrawer />
      <BoxStyled id="home-container">
        <BoxFilterSectionStyled id="filter-section-container">
          <FilterSection
            filtersMenuOptions={filtersMenuOptions}
            abnormalityFilterMenuOptions={abnormalityFilterMenuOptions}
            patientIdsFilterMenuOptions={patientIdsFilterMenuOptions}
            handleFilterApply={onApplyFilter}
            initialFilters={initialFilters}
          />
        </BoxFilterSectionStyled>
        <BoxContentSectionStyled id="patient-section-container">
          {loading ? (
            <CircularProgress />
          ) : (
            <PatientSection
              patientIds={currentPatients}
              pageCount={pageCount}
              pageIndex={pageIndex}
              handlePageChange={handlePageChange}
            />
          )}
        </BoxContentSectionStyled>
      </BoxStyled>
    </>
  );
}
