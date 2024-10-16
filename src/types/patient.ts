export type PatientId = string;
export type Patients = PatientId[];

export type Details = {
  abnormalityId: number;
  abnormalityType: string;
  assessment: number;
  breastDensity: number;
  imageView: string;
  leftOrRightBreast: string;
  massMargins: string;
  massShape: string;
  pathology: string;
  subtlety: number;
};

export type PatientDetails = Record<string, Details>;

export type PatientsDetails = Record<string, [{ [key: string]: string | number }]>;
