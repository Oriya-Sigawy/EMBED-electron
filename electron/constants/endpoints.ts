export const GET_FILTER_OPTIONS = 'filter/options';
export const GET_ABNORMALITY_FILTER_OPTIONS = 'filter/abnormality-options';
export const GET_PATIENT_IDS = 'filter/images-ids';
export const GET_PATIENTS = 'patients/';
export const GET_PATIENT_DETAILS = (imageId: string) => `patients/${imageId}`;
export const GET_PATIENTS_BY_FILTER = 'patients/filter';
export const GET_IMAGES_DETAILS = (imageId: string) => `images/${imageId}/images-metadata`;
export const GET_IMAGE = `images/full`;