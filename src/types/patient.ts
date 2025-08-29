export type PatientId = string;
export type Patients = PatientId[];

export type Details = {
  anonymizedEMPI: number;
  anonymizedAccessionNumber: number;
  tissuedensity: number;
  calcificationDistribution: string;
  type: string;
  assessment: string;
  massDensity: number;
  viewPosition: string;
  side: string;
  massMargins: string;
  massShape: string;
  pathologySeverity: string;
  num_roi: number;
};

export type PatientDetails = Record<string, Details>;

export type PatientsDetails = Record<string, [{ [key: string]: string | number }]>;

export type PatientContainerProps = {
  key: number;
  imageId: number;
  showPatientID: boolean;
  goToPatientView: (patientId: number) => void;
  imageFormat?: string;
};

export type PatientSectionProps = {
  imageIds: number[];
  pageCount: number;
  pageIndex: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};
