export type SeriesMetadata = {
  imageId: number;
  imageFormat: string;
  ViewPosition: string;
  side: string;
  FinalImageType: string;
  SeriesDescription: string;
};

export type PatientImages = {
  id?: number;
  ViewPosition: string;
  side: string;
  imageFilePath: string;
};

export type ImageContainerProps = {
  imageId: number;
  seriesMetadata: SeriesMetadata;
  title?: string;
  goToImageView?: (imageFilePath: string) => void;
};
