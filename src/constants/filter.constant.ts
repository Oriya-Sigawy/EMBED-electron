export const ITEM_HEIGHT = 48;
export const ITEM_PADDING_TOP = 8;
export const FilterMenuStyleProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

export const FiltersMenuHeaders = {
  asses: 'Assessment',
  side: 'Breast Side',
  massdens: 'Mass Density',
  type: 'Type',
  path_severity: 'Pathology Severity',
  ViewPosition: 'View Position'
}; 

export const AbnormalityFilterMenuHeaders = {
  tissueden: 'Tissue Density',
  massshape: 'Mass Shape',
  massmargins: 'Mass Margins',
  calcdistri: 'Calcification Distribution'
};