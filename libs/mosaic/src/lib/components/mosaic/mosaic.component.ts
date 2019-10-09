import {
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges, TemplateRef
} from '@angular/core';
import { generateLayout } from '../../utils/row-variator';
import { LayoutConfig } from '../../types/layout-config';
import { ImageContentDirective } from '../../directives/image-content.directive';

@Component({
  selector: 'ngx-photo-gallery-mosaic',
  templateUrl: './mosaic.component.html',
  styleUrls: ['./mosaic.component.scss']
})
export class MosaicComponent implements OnInit, OnChanges {

  @ContentChild(ImageContentDirective, { static: true })
  imageContent: ImageContentDirective;

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

  @Input()
  identifierGetter: (item: any) => any = (image) => image.identifier;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.recalculateGallery();
    console.log(this.imageContent);
  }

  @HostListener('window:resize', ['$event'])
  private recalculateGallery() {
    this.rows = generateLayout(this.pictures, this.layoutConfig);
    const heights = this.rows.map((row) => row[0].height);
    const totalHeight = heights.reduce((acc, h) => acc + h, 0) + this.rows.length * this.spaceBetween;
    this.el.nativeElement.style.height = totalHeight + 'px';
  }

  getStyleForPicture(picutre: any) {
    const heights = this.rows.map((row) => row[0].height);
    const currentRowIndex = this.rows.findIndex((row) => row.some((image) => this.identifierGetter(image.data) === this.identifierGetter(picutre)));
    const currentRow = this.rows[currentRowIndex];
    const currentItemIndex = currentRow.findIndex((image) => this.identifierGetter(image.data) === this.identifierGetter(picutre));
    const currentItem = currentRow[currentItemIndex];
    const marginTop = heights.slice(0, currentRowIndex).reduce((acc, height) => acc + height, 0) + currentRowIndex * this.spaceBetween;
    const marginLeft = currentRow.slice(0, currentItemIndex).reduce((acc, img) => acc + img.width, 0) + currentItemIndex * this.spaceBetween;
    return {
      height: currentItem.height + 'px',
      width: currentItem.width + 'px',
      backgroundImage: 'url(\'' + currentItem.url + '\')',
      marginTop: marginTop + 'px',
      marginLeft: marginLeft + 'px'
    };
  }
}
