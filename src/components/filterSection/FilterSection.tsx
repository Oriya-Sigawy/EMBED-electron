import React, { useState, useMemo, useCallback, useEffect } from 'react';
import FilterMenu from '../FilterMenu/FilterMenu';
import Button from '../button/Button';
import {
  FiltersMenuHeaders,
  AbnormalityFilterMenuHeaders,
  FilterObject,
  AbnormalityFilterObject,
  PatientFilterObject,
} from '../../constants/filter.constant';
import { BoxFilterMenuStyled, BoxFilterSectionStyled, BoxOthersMenuStyled } from './style';

type FilterSectionProps = {
  filtersMenuOptions: FilterObject;
  abnormalityFilterMenuOptions: AbnormalityFilterObject;
  patientIdsFilterMenuOptions: PatientFilterObject;
  handleFilterApply: (filters) => void;
};

export default function FilterSection(props: FilterSectionProps) {
  const { filtersMenuOptions, abnormalityFilterMenuOptions, patientIdsFilterMenuOptions, handleFilterApply } = props;
  const [filtersMenu, setFiltersMenu] = useState({ options: {}, selected: {} });
  const [abnormalityFilterMenu, setAbnormalityFilterMenu] = useState({
    options: {},
    selected: {},
  });
  const [patientIdsFilterMenu, setPatientIdsFilterMenu] = useState({
    options: {},
    selected: {},
  });

  useEffect(() => {
    setFiltersMenu({ options: filtersMenuOptions, selected: {} });
    setAbnormalityFilterMenu({ options: abnormalityFilterMenuOptions, selected: {} });
    setPatientIdsFilterMenu({ options: patientIdsFilterMenuOptions, selected: {} });
  }, [filtersMenuOptions, abnormalityFilterMenuOptions, patientIdsFilterMenuOptions]);

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

  const onApply = useCallback(async () => {
    const filters = {
      filterOptions: filtersMenu.selected || {},
      abnormalityFilter: abnormalityFilterMenu.selected || {},
      patientIds: patientIdsFilterMenu.selected || {},
    };
    handleFilterApply(filters);
  }, [filtersMenu.selected, abnormalityFilterMenu.selected, patientIdsFilterMenu.selected]);

  const onReset = useCallback(async () => {
    setFiltersMenu({ options: filtersMenuOptions, selected: {} });
    setAbnormalityFilterMenu({ options: abnormalityFilterMenuOptions, selected: {} });
    setPatientIdsFilterMenu({ options: patientIdsFilterMenuOptions, selected: {} });
  }, [filtersMenuOptions, abnormalityFilterMenuOptions, patientIdsFilterMenuOptions]);

  const isDisabled = useMemo(() => {
    const filterEmpty = !filtersMenu.selected || Object.keys(filtersMenu.selected).length === 0;
    const abnormalityEmpty =
      !abnormalityFilterMenu.selected || Object.keys(abnormalityFilterMenu.selected).length === 0;
    const patientIdsEmpty = !patientIdsFilterMenu.selected || Object.keys(patientIdsFilterMenu.selected).length === 0;
    return filterEmpty && abnormalityEmpty && patientIdsEmpty;
  }, [filtersMenu.selected, abnormalityFilterMenu.selected, patientIdsFilterMenu.selected]);

  return (
    <BoxFilterSectionStyled>
      <BoxFilterMenuStyled>
        <FilterMenu
          title="Filters"
          headers={FiltersMenuHeaders}
          options={filtersMenu.options}
          values={filtersMenu.selected}
          onChange={(value) => handleFilterChange('filters', value)}
        />
      </BoxFilterMenuStyled>
      <BoxOthersMenuStyled>
        <FilterMenu
          title="Abnormality Params"
          headers={AbnormalityFilterMenuHeaders}
          options={abnormalityFilterMenu.options}
          values={abnormalityFilterMenu.selected}
          onChange={(value) => handleFilterChange('abnormality', value)}
        />
        <FilterMenu
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
        <Button
          variant="outlined"
          size="small"
          title="Reset"
          disabled={isDisabled}
          sx={{ marginTop: 2 }}
          onClick={onReset}
        />
      </BoxOthersMenuStyled>
    </BoxFilterSectionStyled>
  );
}
