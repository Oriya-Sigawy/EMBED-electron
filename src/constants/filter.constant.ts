export const ITEM_HEIGHT = 48;
export const ITEM_PADDING_TOP = 8;
export const FilterMenuStyleProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 500,
    },
  },
};

export const FiltersMenuHeaders = {
  asses: 'Assessment',
  side: 'Breast Side',
  massdens: 'Mass Density',
  type: 'Biopsy Type',
  pathSeverity: 'Pathology Severity',
  ViewPosition: 'View Position',
};

export const FiltersMenuNames = {
  asses: {
    'N': 'Negative',
    'B': 'Benign',
    'P': 'Probably benign',
    'A': 'Additional evaluation',
    'S': 'Suspicious',
    'M': 'Highly suggestive of malignancy',
    'K': 'Known biopsy-proven malignancy',
    'X': '**No Assessment**',
  },
  side: {
    'L': 'Left',
    'R': 'Right',
    'B': 'Both',
  },
  massdens: {
    '=': 'Isodense',
    '+': 'High density',
    '-': 'Low density',
    '0': 'Fat containing',
  },
  type: {
    'B': 'Needle biopsy pathology',
    'S': 'Surgical pathology',
  },
  pathSeverity: {
    '0': 'invasive cancer',
    '1': 'non-invasive cancer',
    '2': 'high-risk lesion',
    '3': 'borderline lesion',
    '4': 'benign findings',
    '5': 'negative (normal breast tissue)',
    '6': 'non-breast cancer',
  },
  ViewPosition: {
    "AT": "Axillary Tail",
    "CC": "Craniocaudal",
    "CCID": "Craniocaudal Implant-Displaced",
    "CV": "Cleavage View",
    "FB": "From Below",
    "LM": "Lateromedial",
    "LMID": "Lateromedial Implant-Displaced",
    "LMO": "Lateromedial Oblique",
    "ML": "Mediolateral",
    "MLID": "Mediolateral Implant-Displaced",
    "MLO": "Mediolateral Oblique",
    "MLOID": "Mediolateral Oblique Implant-Displaced",
    "RL": "Rolled Lateral",
    "RM": "Rolled Medial",
    "SIO": "Superoinferior Oblique",
    "SPECIMEN": "Specimen Radiograph",
    "TAN": "Tangential",
    "XCCL": "Exaggerated Craniocaudal Lateral",
    "XCCM": "Exaggerated Craniocaudal Medial",
  }
};

export const AbnormalityFilterMenuHeaders = {
  tissueden: 'Tissue Density',
  massshape: 'Mass Shape',
  massmargin: 'Mass Margins',
  calcdistri: 'Calcification Distribution',
};

export const AbnormalityFilterMenuNames = {
  tissueden: {
    '1': 'Almost entirely fatty',
    '2': 'Scattered areas of fibroglandular density',
    '3': 'Heterogeneously dense',
    '4': 'Extremely dense',
    '5': 'Normal Male',
  },
  massshape: {
    'G': 'Generic',
    'R': 'Round',
    'O': 'Oval',
    'X': 'Irregular',
    'Q': 'Questioned architectural distortion',
    'A': 'Architectural distortion',
    'T': 'Asymmectric tubular structure/solitary dilated duct',
    'N': 'Intramammary lymph node',
    'B': 'Global asymmetry',
    'F': 'Focal asymetry',
    'S': 'Asymmetry',
    'V': 'Developing asymmestry',
    'Y': 'Lumph Node',
  },
  massmargin: {
    'D': 'Circumscribed',
    'U': 'Obscured',
    'M': 'Microlobulated',
    'I': 'Indistinct',
    'S': 'Spiculated',
  },
  calcdistri: {
    'G': 'Grouped',
    'S': 'Segmental',
    'R': 'Regional',
    'D': 'Diffuse/scattered',
    'L': 'Linear',
    'C': 'Clustered',
  }
};
