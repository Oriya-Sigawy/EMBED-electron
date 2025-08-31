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
    imageIdsFilterMenuOptions,
    handleFilterApply,
    initialFilters,
  } = props;
  const [filtersMenu, setFiltersMenu] = useState({ options: {}, selected: {} });
  const [abnormalityFilterMenu, setAbnormalityFilterMenu] = useState({
    options: {},
    selected: {},
  });
  const [imageIdsFilterMenu, setImageIdsFilterMenu] = useState({
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
    setImageIdsFilterMenu({ options: imageIdsFilterMenuOptions, selected: initialFilters?.imageIds || {} });
  }, [filtersMenuOptions, abnormalityFilterMenuOptions, imageIdsFilterMenuOptions, initialFilters]);

  const handleFilterChange = useCallback((menu, value) => {
    const menus = {
      filters: setFiltersMenu,
      abnormality: setAbnormalityFilterMenu,
      imagesIds: setImageIdsFilterMenu,
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
      imageIds: imageIdsFilterMenu.selected || {},
    };
    handleFilterApply(filters);
  }, [filtersMenu.selected, abnormalityFilterMenu.selected, imageIdsFilterMenu.selected]);

  const onReset = useCallback(async () => {
    setFiltersMenu({ options: filtersMenuOptions, selected: {} });
    setAbnormalityFilterMenu({ options: abnormalityFilterMenuOptions, selected: {} });
    setImageIdsFilterMenu({ options: imageIdsFilterMenuOptions, selected: {} });
    handleFilterApply({});
  }, [filtersMenuOptions, abnormalityFilterMenuOptions, imageIdsFilterMenuOptions]);

  const onQuerySave = useCallback(
    async (queryName: string) => {
      const filters = {
        filterOptions: filtersMenu.selected || {},
        abnormalityFilter: abnormalityFilterMenu.selected || {},
        imageIds: imageIdsFilterMenu.selected || {},
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
    [filtersMenu.selected, abnormalityFilterMenu.selected, imageIdsFilterMenu.selected]
  );

  const isDisabled = useMemo(() => {
    const filterEmpty = !filtersMenu.selected || Object.keys(filtersMenu.selected).length === 0;
    const abnormalityEmpty =
      !abnormalityFilterMenu.selected || Object.keys(abnormalityFilterMenu.selected).length === 0;
    const imageIdsEmpty = !imageIdsFilterMenu.selected || Object.keys(imageIdsFilterMenu.selected).length === 0;
    return filterEmpty && abnormalityEmpty && imageIdsEmpty;
  }, [filtersMenu.selected, abnormalityFilterMenu.selected, imageIdsFilterMenu.selected]);

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
          title="Images"
          headers={{ imageIds: 'Images Ids' }}
          options={imageIdsFilterMenu.options}
          values={imageIdsFilterMenu.selected}
          onChange={(value) => handleFilterChange('patientsIds', value)}
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
