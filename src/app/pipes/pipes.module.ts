import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeysPipe } from './keys.pipe';
import { EscapeHtmlPipe } from './keep-html.pipe';
import { ImagenPipe } from './imagen.pipe';
import { SafePipe } from './safe.pipe';
import { SafeHtmlPipe } from './safehtml.pipe';
import { SafeUrlPipe } from './safe-url.pipe';
import { TranslateKeyPipe } from './translateKey.pipe';



@NgModule({
  declarations: [
    KeysPipe,
    EscapeHtmlPipe,
    ImagenPipe,
    SafePipe,
    SafeHtmlPipe,
    SafeUrlPipe,
    TranslateKeyPipe
  ],
  exports: [
    KeysPipe,
    EscapeHtmlPipe,
    ImagenPipe,
    SafePipe,
    SafeHtmlPipe,
    SafeUrlPipe,
    TranslateKeyPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
