import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { generateLayout } from '../../utils/row-variator';
import { LayoutConfig } from '../../types/layout-config';
import { ImageContentDirective } from '../../directives/image-content.directive';
import { px, url } from '../../utils/style-utils';

@Component({
  selector: 'ngx-photo-gallery-mosaic',
  templateUrl: './mosaic.component.html',
  styleUrls: ['./mosaic.component.scss']
})
export class MosaicComponent implements OnInit, OnChanges {

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

  @ContentChild(ImageContentDirective, { static: true })
  imageContent: ImageContentDirective;

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
  rows;
  @Input()
  perfectHeight = 300;

  @Output()
  imageSelected = new EventEmitter<any>();

  @Input()
  editMode = false;

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
  }

  @HostListener('window:resize', ['$event'])
  recalculateGallery(event?) {
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
      height: px(currentItem.height),
      width: px(currentItem.width),
      backgroundImage: url(currentItem.url),
      marginTop: px(marginTop),
      marginLeft: px(marginLeft)
    };
  }

  handleClick(event: MouseEvent, img: any) {
    this.imageSelected.emit(img);
    event.stopPropagation();
  }
}
