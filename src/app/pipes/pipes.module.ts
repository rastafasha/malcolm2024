import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeysPipe } from './keys.pipe';
import { EscapeHtmlPipe } from './keep-html.pipe';
import { ImagenPipe } from './imagen.pipe';
import { SafePipe } from './safe.pipe';
import { SafeHtmlPipe } from './safehtml.pipe';
import { SafeUrlPipe } from './safe-url.pipe';



@NgModule({
  declarations: [
    KeysPipe,
    EscapeHtmlPipe,
    ImagenPipe,
    SafePipe,
    SafeHtmlPipe,
    SafeUrlPipe
  ],
  exports: [
    KeysPipe,
    EscapeHtmlPipe,
    ImagenPipe,
    SafePipe,
    SafeHtmlPipe,
    SafeUrlPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
