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
};

export type PatientDetails = Record<string, Details>;

export type PatientsDetails = Record<string, [{ [key: string]: string | number }]>;

export type PatientContainerProps = {
  patientId: string;
  showPatientID: boolean;
  goToPatientView: (patientId: string) => void;
  imageFormat?: string;
};

export type PatientSectionProps = {
  patientIds: string[];
  pageCount: number;
  pageIndex: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};
