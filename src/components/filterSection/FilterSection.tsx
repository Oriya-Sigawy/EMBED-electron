import React, { useState, useMemo, useCallback, useEffect } from 'react';
import FilterMenu from '../filterMenu/FilterMenu';
import Button from '../button/Button';
import { FiltersMenuHeaders, AbnormalityFilterMenuHeaders } from '../../constants/filter.constant';
import { BoxFilterMenuStyled } from './style';
import QuerySaveDialog from '../querySaveDialog/QuerySaveDialog';
import { CHANNELS } from '../../constants/common';
import { FilterSectionProps } from '../../types/filter';

const { EMBED_AGENT } = window;

export default function FilterSection(props: FilterSectionProps) {
  const {
    filtersMenuOptions,
    abnormalityFilterMenuOptions,
    empiAnonsFilterMenuOptions,
    handleFilterApply,
    initialFilters,
  } = props;
  const [filtersMenu, setFiltersMenu] = useState({ options: {}, selected: {} });
  const [abnormalityFilterMenu, setAbnormalityFilterMenu] = useState({
    options: {},
    selected: {},
  });
  const [empiAnonsFilterMenu, setEmpiAnonsFilterMenu] = useState({
    options: {},
    selected: {},
  });
  const [isSaveQueryPopupOpen, setIsSaveQueryPopupOpen] = useState(false);

  useEffect(() => {
    setFiltersMenu({ options: filtersMenuOptions, selected: initialFilters?.filterOptions || {} });
    setAbnormalityFilterMenu({
      options: abnormalityFilterMenuOptions,
      selected: initialFilters?.abnormalityFilter || {},
    });
    setEmpiAnonsFilterMenu({ options: empiAnonsFilterMenuOptions, selected: initialFilters?.empiAnons || {} });
  }, [filtersMenuOptions, abnormalityFilterMenuOptions, empiAnonsFilterMenuOptions, initialFilters]);

  const handleFilterChange = useCallback((menu, value) => {
    const menus = {
      filters: setFiltersMenu,
      abnormality: setAbnormalityFilterMenu,
      empiAnons: setEmpiAnonsFilterMenu,
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
      empiAnons: empiAnonsFilterMenu.selected || {},
    };
    handleFilterApply(filters);
  }, [filtersMenu.selected, abnormalityFilterMenu.selected, empiAnonsFilterMenu.selected]);

  const onReset = useCallback(async () => {
    setFiltersMenu({ options: filtersMenuOptions, selected: {} });
    setAbnormalityFilterMenu({ options: abnormalityFilterMenuOptions, selected: {} });
    setEmpiAnonsFilterMenu({ options: empiAnonsFilterMenuOptions, selected: {} });
    handleFilterApply({});
  }, [filtersMenuOptions, abnormalityFilterMenuOptions, empiAnonsFilterMenuOptions]);

  const onQuerySave = useCallback(
    async (queryName: string) => {
      const filters = {
        filterOptions: filtersMenu.selected || {},
        abnormalityFilter: abnormalityFilterMenu.selected || {},
        empiAnons: empiAnonsFilterMenu.selected || {},
      };

      if (queryName) {
        const response = await EMBED_AGENT.send(CHANNELS.SAVE_QUERY, { queryName, filters });
        if (response === 'success') {
          alert(`Query saved successfully as "${queryName}.json" in the "savedQueries" folder.`);
        } else {
          alert('Saving query was canceled.');
        }
      }
    },
    [filtersMenu.selected, abnormalityFilterMenu.selected, empiAnonsFilterMenu.selected]
  );

  const isDisabled = useMemo(() => {
    const filterEmpty = !filtersMenu.selected || Object.keys(filtersMenu.selected).length === 0;
    const abnormalityEmpty =
      !abnormalityFilterMenu.selected || Object.keys(abnormalityFilterMenu.selected).length === 0;
    const imageIdsEmpty = !empiAnonsFilterMenu.selected || Object.keys(empiAnonsFilterMenu.selected).length === 0;
    return filterEmpty && abnormalityEmpty && imageIdsEmpty;
  }, [filtersMenu.selected, abnormalityFilterMenu.selected, empiAnonsFilterMenu.selected]);

  return (
    <>
      <BoxFilterMenuStyled id="filter-menu-filter-section">
        <FilterMenu
          title="Filters"
          headers={FiltersMenuHeaders}
          options={filtersMenu.options}
          values={filtersMenu.selected}
          onChange={(value) => handleFilterChange('filters', value)}
        />
      </BoxFilterMenuStyled>
      <BoxFilterMenuStyled id="other-filter-menu-filter-section">
        <FilterMenu
          title="Abnormality Params"
          headers={AbnormalityFilterMenuHeaders}
          options={abnormalityFilterMenu.options}
          values={abnormalityFilterMenu.selected}
          onChange={(value) => handleFilterChange('abnormality', value)}
        />
        <FilterMenu
          title="Anonymized EMPIs"
          headers={{ empiAnons: 'Empi Anons' }}
          options={empiAnonsFilterMenu.options}
          values={empiAnonsFilterMenu.selected}
          onChange={(value) => handleFilterChange('empiAnons', value)}
        />
        <Button
          variant="contained"
          size="small"
          title="Apply"
          disabled={isDisabled}
          sx={{ marginRight: 2, marginLeft: 2, marginBottom: 1 }}
          onClick={onApply}
        />
        <Button
          variant="outlined"
          size="small"
          title="Reset"
          disabled={isDisabled}
          sx={{ marginRight: 2, marginLeft: 2, marginBottom: 1 }}
          onClick={onReset}
        />
        <Button
          variant="outlined"
          size="small"
          title="Save Query"
          disabled={isDisabled}
          sx={{ marginRight: 2, marginLeft: 2, marginBottom: 1 }}
          onClick={() => setIsSaveQueryPopupOpen(true)}
        />
      </BoxFilterMenuStyled>
      <QuerySaveDialog
        open={isSaveQueryPopupOpen}
        onClose={() => setIsSaveQueryPopupOpen(false)}
        onSave={onQuerySave}
      />
    </>
  );
}
