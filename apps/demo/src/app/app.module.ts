import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MosaicModule } from '@ngx-photo-gallery/mosaic';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MosaicModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
