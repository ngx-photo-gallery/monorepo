import { LayoutConfig } from '../types/layout-config';
import { RowVariant } from './row-variant';

export function generateLayout(items: any[], config: LayoutConfig) {
  const rowVariants = new RowVariant(items, config);
  let bestRows = [];
  let currentBestChild = rowVariants.bestChild;
  while (currentBestChild !== undefined) {
    bestRows = [...bestRows, currentBestChild];
    currentBestChild = currentBestChild.bestChild;
  }
  return bestRows.map((row) => {
    const height = row.height;
    return row.rowImages.map((i) => ({
      height: height,
      width: config.widthGetterFn(i) * height / config.heightGetterFn(i),
      url: config.lowSizePreviewUrlGetterFn(i),
      data: i
    }));
  });
}
