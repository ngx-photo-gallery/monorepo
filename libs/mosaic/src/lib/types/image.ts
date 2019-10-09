export interface Picture {
  fullSizePreview: PictureLocation;
  lowSizePreview: PictureLocation;
  realWidth: number;
  realHeight: number;
}


export type PictureLocation = string;
