export type FilterMenu = {
  title: string;
  items: string[];
  value: string[];
  onChange: (event) => void;
  valueNames?: { [key: string]: string };
};

export type FilterMenuProps = {
  title: string;
  headers: any;
  options: any;
  values: any;
  onChange: (value: string[]) => void;
  names?: { [key: string]: { [key: string]: string } };
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

export interface EmpiAnonsFilterObject {
  empiAnons: number[];
}

export interface ImageIds {
  imageIds: number[];
}

export type FilterSectionProps = {
  filtersMenuOptions: FilterObject;
  abnormalityFilterMenuOptions: AbnormalityFilterObject;
  empiAnonsFilterMenuOptions: EmpiAnonsFilterObject;
  handleFilterApply: (filters) => void;
  initialFilters?: { filterOptions?: any; abnormalityFilter?: any; empiAnons?: any };
};

export type SavedQuery = {
  queryName: string;
  filters: {
    filterOptions: any;
    abnormalityFilter: any;
    imageIds: any;
  };
};

export type SavedQueries = SavedQuery[];

export type SavedQueryProps = {
  queryName: string;
  filters: {
    filterOptions: any;
    abnormalityFilter: any;
    imageIds: any;
  };
  handleDelete: (queryName: string) => void;
  handleApply: (queryName: string) => void;
};
