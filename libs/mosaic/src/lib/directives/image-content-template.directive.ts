import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ngxPhotoGalleryImageContentTemplate]'
})
export class ImageContentTemplateDirective {

  constructor(public template: TemplateRef<any>) {
  }



}
