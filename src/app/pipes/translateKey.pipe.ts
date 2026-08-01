import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'translateKey',
  standalone: false,
  pure: false // Sigue siendo obligatorio para que escuche el markForCheck()
})
export class TranslateKeyPipe implements PipeTransform {
  private translateService = inject(TranslateService);

  transform(value: any, fallback: 'es' | 'en' = 'es'): string {
    if (!value) return '';
    
    // Leemos el idioma actual activo que cambia con la función 'use()'
    const currentLang = this.translateService.currentLang || this.translateService.defaultLang || fallback;
    
    return value[currentLang] || value[fallback] || '';
  }
}
