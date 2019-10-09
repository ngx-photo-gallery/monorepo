import { LayoutConfig } from '../types/layout-config';

export class RowVariant {
  rowImages: any[];
  remainingImages: any[];
  childrenCache: any[];

  constructor(private allImages: any[], private config: LayoutConfig, sliceIndex?: number) {
    if (sliceIndex !== undefined) {
      this.sliceImages(allImages, sliceIndex);
    } else {
      this.rowImages = [];
      this.remainingImages = allImages;
    }
  }

  /**
   * Calculates height of current row
   */
  get height() {
    const totalAspectRatio = this.rowImages.reduce((acc, image) => {
      return acc + this.getAspectRatioOfImage(image);
    }, 0);

    return this.widthWithoutSpaces / totalAspectRatio;
  }

  get widthWithoutSpaces() {
    return this.config.width - (this.rowImages.length - 1) * this.config.spaceBetween;
  }

  get bestChild() {
    const childrenVariants = this.childrenVariants;
    if (!childrenVariants) {
      return undefined;
    }
    const minErrorRow = childrenVariants.reduce((acc, variant) => {
      const currentError = variant.error;
      if (currentError < acc.currentMin) {
        return { currentMin: currentError, currentRow: variant };
      }
      return acc;
    }, { currentMin: 9999999, currentRow: childrenVariants[0] });
    return minErrorRow.currentRow;
  }

  private get childrenVariants(): RowVariant[] {

    if (this.remainingImages.length === 0) {
      return [];
    }
    if (!this.childrenCache) {
      this.childrenCache = this.createRowVariants()
    }
    return this.childrenCache;
  }

  get error(): number {
    return Math.abs(this.height - this.config.perfectHeight);
  }

  private createRowVariants(): RowVariant[] {
    if (!this.remainingImages) {
      return [];
    }
    if (this.remainingImages.length === 1) {
      return [new RowVariant([...this.remainingImages], this.config, 0)];
    }
    const { currentWidth, currentImageIndex } = this.getBreakpointIndexAndPosition();
    if (currentWidth !== this.config.width) {
      return [
        new RowVariant([...this.remainingImages], this.config, currentImageIndex),
        new RowVariant([...this.remainingImages], this.config, currentImageIndex - 1)
      ];
    }
    return [];
  }

  private getBreakpointIndexAndPosition() {
    let currentWidth = 0;
    let currentImageIndex = 0;
    let currentSpacesWidth = 0;
    while (currentWidth < this.config.width - currentSpacesWidth && currentImageIndex < this.remainingImages.length) {
      const currentImage = this.remainingImages[currentImageIndex];
      const currentImageAspectRatio = this.getAspectRatioOfImage(currentImage);
      const imageWidthWithIdealHeight = this.config.perfectHeight * currentImageAspectRatio;
      currentWidth += imageWidthWithIdealHeight;
      currentSpacesWidth += this.config.spaceBetween;
      currentImageIndex++;
    }
    return { currentWidth: currentWidth - currentSpacesWidth, currentImageIndex };
  }

  private sliceImages(allImages: any[], sliceIndex: number) {
    if (sliceIndex === 0) {
      this.rowImages = [...this.allImages];
      this.remainingImages = [];
    } else {
      this.rowImages = allImages.slice(0, sliceIndex);
      this.remainingImages = allImages.slice(sliceIndex, allImages.length);
    }
  }

  private getAspectRatioOfImage(image: any) {
    return this.config.widthGetterFn(image) / this.config.heightGetterFn(image);
  }
}



