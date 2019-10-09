import { Component } from '@angular/core';

@Component({
  selector: 'ngx-photo-gallery-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  get perfectHeight() {
    return Number.parseInt(this._perfectHeight, 10);
  }
  pictures: any[] = [
    {
      identifier: 1,
      fullSizePreview: '/assets/1_original.jpg',
      lowSizePreview: '/assets/1_preview.jpg',
      realWidth: 1920,
      realHeight: 547
    },
    {
      identifier: 2,
      fullSizePreview: '/assets/2_original.jpg',
      lowSizePreview: '/assets/2_preview.jpg',
      realWidth: 3879,
      realHeight: 2866
    },
    {
      identifier: 3,
      fullSizePreview: '/assets/3_original.jpg',
      lowSizePreview: '/assets/3_preview.jpg',
      realWidth: 3941,
      realHeight: 2975
    },
    {
      identifier: 4,
      fullSizePreview: '/assets/4_original.jpg',
      lowSizePreview: '/assets/4_preview.jpg',
      realWidth: 7648,
      realHeight: 2214
    },
    {
      identifier:5,
      fullSizePreview: '/assets/5_original.jpg',
      lowSizePreview: '/assets/5_preview.jpg',
      realWidth: 3863,
      realHeight: 2828,
    },
    {
      identifier: 6,
      fullSizePreview: '/assets/6_original.jpg',
      lowSizePreview: '/assets/6_preview.jpg',
      realWidth: 3937,
      realHeight: 2929,
    },
    {
      identifier: 'seven',
      fullSizePreview: '/assets/7_original.jpg',
      lowSizePreview: '/assets/7_preview.jpg',
      realWidth: 3919,
      realHeight: 2911,
    },

  ];
  _perfectHeight = '350';

  title = 'demo';

  widthGetterFn = (image) => image.realWidth;
  heightGetterFn = (image) => image.realHeight;
  lowSizePreviewGetter = (image) => image.lowSizePreview;

  handleClick(img: any) {
    alert('clicked on ' +  img.identifier);
  }
}
