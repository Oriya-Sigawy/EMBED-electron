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
  leftOrRightBreast: 'Breast Side',
  imageView: 'View',
  abnormalityType: 'Abnormality',
  breastDensity: 'Breast Density',
  subtlety: 'Subtlety',
  assessment: 'BIRADS Assessment',
  pathology: 'Pathology',
  abnormalityId: '#Abnormality',
};

//This block is for sub-filters of abnormalities (e.g., calcifications, mass shape)
export const AbnormalityFilterMenuHeaders = {
  calcType: 'Classification Type',
  calcDistribution: 'Classification Distribution',
  massShape: 'Mass Shape',
  massMargins: 'Mass Margins',
};
