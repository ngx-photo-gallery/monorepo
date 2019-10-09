import { Component } from '@angular/core';

@Component({
  selector: 'ngx-photo-gallery-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pictures: any[] = [
    {
      fullSizePreview: 'https://andrey.sexy/wp-content/uploads/photo-gallery/panorama_(1).jpg?bwg=1570383416',
      lowSizePreview: 'https://andrey.sexy/wp-content/uploads/photo-gallery/panorama_(1).jpg?bwg=1570383416',
      realWidth: 1920,
      realHeight: 547
    },
    {
      fullSizePreview: 'https://andrey.sexy/wp-content/uploads/photo-gallery/5_(1)_(1)_(1)_(1)_(1)_(1).jpg?bwg=1570381254',
      lowSizePreview: 'https://andrey.sexy/wp-content/uploads/photo-gallery/5_(1)_(1)_(1)_(1)_(1)_(1).jpg?bwg=1570381254',
      realWidth: 3879,
      realHeight: 2866
    },
    {
      fullSizePreview: 'https://andrey.sexy/wp-content/uploads/photo-gallery/5_(1)_(1)_(1)_(1)_(1).jpg?bwg=1569863881',
      lowSizePreview: 'https://andrey.sexy/wp-content/uploads/photo-gallery/5_(1)_(1)_(1)_(1)_(1).jpg?bwg=1569863881',
      realWidth: 3941,
      realHeight: 2975
    },
    {
      fullSizePreview: 'https://andrey.sexy/wp-content/uploads/photo-gallery/affinity.jpg?bwg=1567868280',
      lowSizePreview: 'https://andrey.sexy/wp-content/uploads/photo-gallery/affinity.jpg?bwg=1567868280',
      realWidth: 7648,
      realHeight: 2214
    },
    {
      fullSizePreview: 'https://andrey.sexy/wp-content/uploads/photo-gallery/13.jpg?bwg=1567359413',
      lowSizePreview: 'https://andrey.sexy/wp-content/uploads/photo-gallery/13.jpg?bwg=1567359413',
      realWidth: 3863,
      realHeight: 2828,
    },
    {
      fullSizePreview: 'https://andrey.sexy/wp-content/uploads/photo-gallery/center_sunset.jpg?bwg=1566930551',
      lowSizePreview: 'https://andrey.sexy/wp-content/uploads/photo-gallery/center_sunset.jpg?bwg=1566930551',
      realWidth: 3937,
      realHeight: 2929,
    },
    {
      fullSizePreview: 'https://andrey.sexy/wp-content/uploads/photo-gallery/3_(1)_(1)_(1).jpg?bwg=1567868281',
      lowSizePreview: 'https://andrey.sexy/wp-content/uploads/photo-gallery/3_(1)_(1)_(1).jpg?bwg=1567868281',
      realWidth: 3919,
      realHeight: 2911,
    },

  ];

  widthGetterFn = (image) => image.realWidth;
  heightGetterFn = (image) => image.realHeight;
  lowSizePreviewGetter = (image) => image.lowSizePreview;

  title = 'demo';
}
