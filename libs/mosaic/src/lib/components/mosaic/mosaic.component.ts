import { Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { generateLayout } from '../../utils/row-variator';
import { LayoutConfig } from '../../types/layout-config';

@Component({
  selector: 'ngx-photo-gallery-mosaic',
  templateUrl: './mosaic.component.html',
  styleUrls: ['./mosaic.component.scss']
})
export class MosaicComponent implements OnInit, OnChanges {

  /**
   * List of rowImages for display
   */
  @Input()
  pictures: any[];
  /**
   * Space between rowImages in the center in pixels
   */
  @Input()
  spaceBetween = 20;
  @Input()
  maxHeight = 100;
  @HostListener('style.width.px')
  private rows;
  @Input()
  private perfectHeight = 300;

  constructor(private el: ElementRef) {
  }

  private get layoutConfig(): LayoutConfig {
    return {
      width: this.width,
      perfectHeight: this.perfectHeight,
      spaceBetween: this.spaceBetween,
      heightGetterFn: this.realHeightGetter,
      widthGetterFn: this.realWidthGetter,
      lowSizePreviewUrlGetterFn: this.lowSizePreviewGetter
    };
  }

  private get width(): number {
    return this.el.nativeElement.offsetWidth;
  }

  /**
   * Getter for image's real width. By default it simply gets 'width' property
   * of object
   * @param image one of items which passed into pictures input
   */
  @Input()
  realWidthGetter: (item: any) => number = (image) => image.width;

  /**
   * Getter for image's real height. By default it simply gets 'height' property
   * of object
   * @param image one of items which passed into pictures input
   */
  @Input()
  realHeightGetter: (item: any) => number = (image) => image.height;

  /**
   * Getter for image's low size preview url. By default it gets 'lowSizePreviewUrl' property
   * @param image one of items which passed into pictures input
   */
  @Input()
  lowSizePreviewGetter: (item: any) => any = (image) => image.lowSizePreviewUrl;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.recalculateGallery();
  }

  @HostListener('window:resize', ['$event'])
  private recalculateGallery() {
    this.rows = generateLayout(this.pictures, this.layoutConfig);
  }

}
