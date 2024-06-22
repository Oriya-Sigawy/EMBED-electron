import { PatientsDetails } from 'types/patient';

function isPatientInFilter(patientDetails: any, filters: any): boolean {
  if (Object.keys(filters).length === 0) return true;

  for (const key in filters) {
    const filterValues = filters[key];
    if (filterValues.includes(patientDetails[key])) {
      return true;
    }
  }
  return false;
}

export function filterPatients(patientsDetails: PatientsDetails, filters: any) {
  const { filterOptions, abnormalityFilter, patientIds } = filters;

  Object.keys(patientsDetails).filter((patientId) => {
    const patientDetails = patientsDetails[patientId];
    for (const row in patientDetails) {
      if (
        isPatientInFilter(patientDetails[row], filterOptions) ||
        isPatientInFilter(patientDetails[row], abnormalityFilter) ||
        patientIds.includes(patientId)
      ) {
        return true;
      }
    }
    return false;
  });
}
