import { ContentChild, Directive, Input, TemplateRef } from '@angular/core';
import { ImageContentTemplateDirective } from './image-content-template.directive';

@Directive({
  selector: 'ngx-photo-gallery-image-content'
})
export class ImageContentDirective {

  @Input()
  @ContentChild(ImageContentTemplateDirective, {
    read: TemplateRef,
    static: false
  })
  template: TemplateRef<any>;

  constructor() {
  }

}
