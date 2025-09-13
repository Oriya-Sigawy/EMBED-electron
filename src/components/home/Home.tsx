import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { CircularProgress } from '@mui/material';
import { AbnormalityFilterObject, FilterObject, EmpiAnonsFilterObject, ImageIds } from '../../types/filter';
import { CHANNELS } from '../../constants/common';
import FilterSection from '../filterSection/FilterSection';
import PatientSection from '../patientsSection/PatientsSection';
import { BoxStyled, BoxFilterSectionStyled, BoxContentSectionStyled } from './style';
import MenuDrawer from '../menuDrawer/MenuDrawer';
import { useLocation } from 'react-router-dom';

const { EMBED_AGENT } = window;    //Electron’s IPC (Inter-Process Communication) that enables the frontend React code to send messages to the Electron backend. defines in preloads.ts

export default function Home() {
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);
  const [filtersMenuOptions, setFiltersMenuOptions] = useState<FilterObject>();
  const [abnormalityFilterMenuOptions, setAbnormalityFilterMenuOptions] = useState<AbnormalityFilterObject>();
  const [empiAnonsFilterMenuOptions, setEmpiAnonsFilterMenuOptions] = useState<EmpiAnonsFilterObject>();
  const [imagesIds, setImagesIds] = useState<number[]>();
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
      const response = await EMBED_AGENT.send(CHANNELS.FILTER_OPTIONS);
      const options: FilterObject = JSON.parse(response);     //backend is returning JSON strings
      console.log("Response for filter options: ", options);
      setFiltersMenuOptions(options);
    };

    const getAbnormalityFilterOptions = async () => {
      console.log("Fetching abnormality filter options...");
      const response = await EMBED_AGENT.send(CHANNELS.ABNORMALITY_FILTER_OPTIONS);
      const options: AbnormalityFilterObject = JSON.parse(response);   //backend is returning JSON string
      console.log("Response for abnormality filter options: ", options);
      setAbnormalityFilterMenuOptions(options);
    };

    const getEmpiAnons = async () => {
      console.log("Fetching patient IDs filter options...");
      const response = await EMBED_AGENT.send(CHANNELS.EMPI_ANONS);
      const options: EmpiAnonsFilterObject = JSON.parse(response);   
      setEmpiAnonsFilterMenuOptions(options);
    };

    const getImageIds = async () => {
      console.log("Fetching patient IDs filter options...");
      const response = await EMBED_AGENT.send(CHANNELS.IMAGE_IDS);
      const options: ImageIds = JSON.parse(response);
      if (!imagesIds && options.imageIds) {
        setImagesIds(options.imageIds);
      }
      setLoading(false);
    };

    getFilterOptions();
    getAbnormalityFilterOptions();
    getEmpiAnons();
    getImageIds();
  }, []);

  const onApplyFilter = useCallback(async (filters) => {
    const response = await EMBED_AGENT.send(CHANNELS.FILTER_PATIENTS, filters);
    const patients: ImageIds = JSON.parse(response);   //backend is returning JSON string
    setImagesIds(patients.imageIds);
  }, []);

  const handlePageChange = useCallback((event, value) => {
    setPageIndex(value);
  }, []);

  const pageCount = useMemo(() => {
    return Math.ceil(imagesIds?.length / 2) || 1;
  }, [imagesIds]);

  const currentPatients = useMemo(() => {
    const index = (pageIndex - 1) * 2;    //assuming 2 patients per page, need to change it to match our DB. maybe need another unique identifier for patients
    return imagesIds?.slice(index, index + 2);
  }, [imagesIds, pageIndex, handlePageChange]);

  return (
    <>
      <MenuDrawer />
      <BoxStyled id="home-container">
        <BoxFilterSectionStyled id="filter-section-container">
          <FilterSection
            filtersMenuOptions={filtersMenuOptions}
            abnormalityFilterMenuOptions={abnormalityFilterMenuOptions}
            empiAnonsFilterMenuOptions={empiAnonsFilterMenuOptions}
            handleFilterApply={onApplyFilter}
            initialFilters={initialFilters}
          />
        </BoxFilterSectionStyled>
        <BoxContentSectionStyled id="patient-section-container">
          {loading ? (
            <CircularProgress />
          ) : (
            <PatientSection
              imageIds={currentPatients}
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
