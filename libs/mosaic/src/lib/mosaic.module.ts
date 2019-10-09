import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MosaicComponent } from './components/mosaic/mosaic.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MosaicComponent],
  exports: [MosaicComponent]
})
export class MosaicModule {}
