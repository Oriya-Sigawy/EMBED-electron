export type ImageId = string;
export type Patients = ImageId[];

export type Details = {
  imageId: number;
  empiAnon: number;
  accAnon: number;
  tissueden: number;
  calcdistri: string;
  type: string;
  asses: string;
  ViewPosition: string;
  side: string;
  massmargin: string;
  massshape: string;
  massdens: string;
  pathSeverity: string;
  numRoi: number;
};

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
