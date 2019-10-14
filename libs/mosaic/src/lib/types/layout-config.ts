export interface LayoutConfig {
  width: number;
  perfectHeight: number;
  spaceBetween: number;
  widthGetterFn: (item: any) => number;
  heightGetterFn: (item: any) => number;
  lowSizePreviewUrlGetterFn: (item: any) => string;
  maxImageHeight: number;
}
