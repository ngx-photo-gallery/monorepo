import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MosaicComponent } from './components/mosaic/mosaic.component';
import { ImageContentTemplateDirective } from './directives/image-content-template.directive';
import { ImageContentDirective } from './directives/image-content.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [MosaicComponent, ImageContentTemplateDirective, ImageContentDirective],
  exports: [MosaicComponent, ImageContentTemplateDirective, ImageContentDirective]
})
export class MosaicModule {}
