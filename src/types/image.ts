export type SeriesMetadata = {
  class: string;
  imageView: string;
  leftOrRightBreast: string;
  sopUIDs: string[];
};

export type ImageMetadata = Record<string, SeriesMetadata>;

export type PatientImages = {
  class: string;
  imageView: string;
  leftOrRightBreast: string;
  image: string;
};
