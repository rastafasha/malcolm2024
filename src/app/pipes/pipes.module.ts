import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeysPipe } from './keys.pipe';
import { EscapeHtmlPipe } from './keep-html.pipe';
import { ImagenPipe } from './imagen.pipe';
import { SafePipe } from './safe.pipe';
import { SafeHtmlPipe } from './safehtml.pipe';



@NgModule({
  declarations: [
    KeysPipe,
    EscapeHtmlPipe,
    ImagenPipe,
    SafePipe,
    SafeHtmlPipe
  ],
  exports: [
    KeysPipe,
    EscapeHtmlPipe,
    ImagenPipe,
    SafePipe,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
