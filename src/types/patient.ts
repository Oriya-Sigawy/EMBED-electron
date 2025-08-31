export type ImageId = string;
export type Patients = ImageId[];

export type Details = {
  anonymizedEMPI: number;
  anonymizedAccessionNumber: number;
  tissuedensity: number;
  calcificationDistribution: string;
  type: string;
  assessment: string;
  massDensity: number;
  ViewPosition: string;
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
  showImageId: boolean;
  goToPatientView: (imageId: number) => void;
  imageFormat?: string;
};

export type PatientSectionProps = {
  imageIds: number[];
  pageCount: number;
  pageIndex: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};
