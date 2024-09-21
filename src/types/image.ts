export type SeriesMetadata = {
  class: string;
  imageView: string;
  leftOrRightBreast: string;
  sopUIDs: string[];
};

export type ImageMetadata = Record<string, SeriesMetadata>;

export type Metadata = {
  imagesMetadata: ImageMetadata;
  imageCount: number;
};

export type PatientImages = {
  id?: number;
  seriesUID?: string;
  sopUID?: string;
  class?: string;
  imageView: string;
  leftOrRightBreast: string;
  imageFilePath: string;
};
