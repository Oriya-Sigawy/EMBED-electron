import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Grid, Pagination } from '@mui/material';
import FilterMenu from '../FilterMenu/FilterMenu';
import Button from '../button/Button';
import {
  FiltersMenuHeaders,
  AbnormalityFilterMenuHeaders,
  AbnormalityFilterObject,
  FilterObject,
  PatientFilterObject,
} from '../../constants/filter.constant';
import { CHANNELS } from '../../constants/common';
import PatientContainer from '../patientContainer/patientContainer';

const { DDSM_AGENT } = window;

const Home = (): JSX.Element => {
  const [filtersMenu, setFiltersMenu] = useState({ options: {}, selected: {} });
  const [abnormalityFilterMenu, setAbnormalityFilterMenu] = useState({ options: {}, selected: {} });
  const [patientIdsFilterMenu, setPatientIdsFilterMenu] = useState({ options: {}, selected: {} });
  const [patientsIds, setPatientsIds] = useState<string[]>();
  const [currentPatientIds, setCurrentPatientIds] = useState<string[]>();
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);

  useEffect(() => {
    const getFilterOptions = async () => {
      const response = await DDSM_AGENT.send(CHANNELS.FILTER_OPTIONS);
      const options: FilterObject = JSON.parse(response);
      setFiltersMenu((prev) => {
        return {
          ...prev,
          ['options']: options,
        };
      });
    };

    const getAbnormalityFilterOptions = async () => {
      const response = await DDSM_AGENT.send(CHANNELS.ABNORMALITY_FILTER_OPTIONS);
      const options: AbnormalityFilterObject = JSON.parse(response);
      setAbnormalityFilterMenu((prev) => {
        return {
          ...prev,
          ['options']: options,
        };
      });
    };

    const getPatientOptions = async () => {
      const response = await DDSM_AGENT.send(CHANNELS.PATIENT_IDS);
      const options: PatientFilterObject = JSON.parse(response);
      setPatientIdsFilterMenu((prev) => {
        return {
          ...prev,
          ['options']: options,
        };
      });

      if (!patientsIds && options.patientsIds) {
        setPatientsIds(options.patientsIds);
        setPageCount(options.patientsIds.length / 2);
        setCurrentPatientIds(options.patientsIds.slice(0, 2));
      }
    };

    getFilterOptions();
    getAbnormalityFilterOptions();
    getPatientOptions();
  }, []);

  const handleFilterChange = useCallback((menu, value) => {
    const menus = {
      filters: setFiltersMenu,
      abnormality: setAbnormalityFilterMenu,
      patientsIds: setPatientIdsFilterMenu,
    };
    menus[menu]((prev) => {
      const options = prev.options;
      return {
        ['options']: options,
        ['selected']: !value || Object.keys(value).length === 0 ? null : value,
      };
    });
  }, []);

  const isDisabled = useMemo(() => {
    return !filtersMenu.selected && !abnormalityFilterMenu.selected && !patientIdsFilterMenu.selected;
  }, [filtersMenu.selected, abnormalityFilterMenu.selected, patientIdsFilterMenu.selected]);

  const onApply = useCallback(async () => {
    const filters = {
      filterOptions: filtersMenu.selected || {},
      abnormalityFilter: abnormalityFilterMenu.selected || {},
      patientIds: patientIdsFilterMenu.selected || {},
    };

    const response = await DDSM_AGENT.send(CHANNELS.FILTER_PATIENTS, filters);
    const patients: PatientFilterObject = JSON.parse(response);
    setPatientsIds(patients.patientsIds);
    setCurrentPatientIds(patients.patientsIds.slice(0, 2));
  }, [filtersMenu.selected, abnormalityFilterMenu.selected, patientIdsFilterMenu.selected]);

  const handlePageChange = useCallback((event, value) => {
    const index = (value - 1) * 2;
    setCurrentPatientIds(patientsIds?.slice(index, index + 2));
    setPageIndex(value);
  }, []);

  return (
    <Grid container>
      <Grid item xs={4}>
        <Grid container columns={2} sx={{ margin: 0 }}>
          <Grid item xs={1}>
            <FilterMenu
              variant={'h5'}
              sx={{
                background: '#4dabf5',
                borderRadius: 4,
                marginRight: 2,
                paddingBlock: 3,
              }}
              title="Filters"
              headers={FiltersMenuHeaders}
              options={filtersMenu.options}
              values={filtersMenu.selected}
              onChange={(value) => handleFilterChange('filters', value)}
            />
          </Grid>
          <Grid item xs={1}>
            <FilterMenu
              variant={'h6'}
              sx={{ paddingBlock: 1, background: '#4dabf5', borderRadius: 4, marginRight: 2 }}
              title="Abnormality Params"
              headers={AbnormalityFilterMenuHeaders}
              options={abnormalityFilterMenu.options}
              values={abnormalityFilterMenu.selected}
              onChange={(value) => handleFilterChange('abnormality', value)}
            />
            <FilterMenu
              variant={'h5'}
              sx={{ marginTop: 4, paddingBlock: 2, background: '#4dabf5', borderRadius: 4, marginRight: 2 }}
              title="Patients"
              headers={{ patientsIds: 'Patients Ids' }}
              options={patientIdsFilterMenu.options}
              values={patientIdsFilterMenu.selected}
              onChange={(value) => handleFilterChange('patientsIds', value)}
            />
            <Button
              variant="contained"
              size="small"
              title="Apply"
              disabled={isDisabled}
              sx={{ marginTop: 4 }}
              onClick={onApply}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={8} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <div>
          {currentPatientIds &&
            currentPatientIds?.map((patientId) => <PatientContainer key={patientId} patientId={patientId} />)}
        </div>
        <div style={{ display: 'flex', position: 'fixed', right: 0, bottom: 6, margin: 2 }}>
          <Pagination count={pageCount} page={pageIndex} onChange={handlePageChange} size="small" />
        </div>
      </Grid>
    </Grid>
  );
};

export default Home;
