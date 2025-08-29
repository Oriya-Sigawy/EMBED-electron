export type FilterMenu = {
  title: string;
  items: string[];
  value: string[];
  onChange: (event) => void;
};

export type FilterMenuProps = {
  title: string;
  headers: any;
  options: any;
  values: any;
  onChange: (value: string[]) => void;
};

export interface FilterObject {
  asses: string[];
  side: string[];
  massdens: string[];
  type: string[];
  path_severity: string[];
  ViewPosition: string[];
}

export interface AbnormalityFilterObject {
  tissueden: string[];
  massshape: string[];
  massmargin: string[];
  calcdistri: string[];
}

export interface PatientFilterObject {
  imageIds: number[];
}

export type FilterSectionProps = {
  filtersMenuOptions: FilterObject;
  abnormalityFilterMenuOptions: AbnormalityFilterObject;
  patientIdsFilterMenuOptions: PatientFilterObject;
  handleFilterApply: (filters) => void;
  initialFilters?: { filterOptions?: any; abnormalityFilter?: any; patientIds?: any };
};

export type SavedQuery = {
  queryName: string;
  filters: {
    filterOptions: any;
    abnormalityFilter: any;
    patientIds: any;
  };
};

export type SavedQueries = SavedQuery[];

export type SavedQueryProps = {
  queryName: string;
  filters: {
    filterOptions: any;
    abnormalityFilter: any;
    patientIds: any;
  };
  handleDelete: (queryName: string) => void;
  handleApply: (queryName: string) => void;
};
