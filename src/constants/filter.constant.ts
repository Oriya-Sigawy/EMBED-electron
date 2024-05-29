export const ITEM_HEIGHT = 48;
export const ITEM_PADDING_TOP = 8;
export const FilterMenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const FILTERS = {
  breast_side: {
    title: 'Breast Side',
    items: ['Right', 'Left'],
  },
  view: {
    title: 'View',
    items: ['MLO', 'CC'],
  },
  abnormality: {
    title: 'Abnormality',
    items: ['Mass', 'Calcification'],
  },
  breast_density: {
    title: 'Breast Density',
    items: ['1', '2', '3', '4'],
  },
  subtlety: {
    title: 'Subtlety',
    items: ['1', '2', '3', '4', '5'],
  },
  birads_assessment: {
    title: 'BIRADS Assessment',
    items: ['0', '1', '2', '3', '4', '5'],
  },
  pathology: {
    title: 'Pathology',
    items: ['Benign', 'Malignant', 'Benign without callback'],
  },
  abnormalities: {
    title: '#Abnormalities',
    items: ['0', '1', '2', '3', '4', '5'],
  },
};

export const ABNORMALITY_PARAMS = {
  classification_type: {
    title: 'Classification Type',
    items: ['0', '1', '2', '3', '4', '5'],
  },
  classification_distribution: {
    title: 'Classification Distribution',
    items: ['0', '1', '2', '3', '4', '5'],
  },
  mass_shape: {
    title: 'Mass Shape',
    items: ['IRREGULAR', 'ROUND', 'LOBULATED', 'OVAL', 'IRREGULAR-ARCHITECTURAL_DISTORTION'],
  },
  mass_margins: {
    title: 'Mass Margins',
    items: ['SPICULATED', 'CIRCUMSCRIBED', 'ILL_DEFINED', 'OBSCURED'],
  },
};
