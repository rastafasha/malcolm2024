import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// import DOMPurify from 'dompurify';

@Pipe({
    name: 'safeHtml',
    standalone: false
})
export class SafeHtmlPipe implements PipeTransform {


  constructor(protected sanitizer: DomSanitizer) {}

  public transform(value: any, type: string): any {
    // const sanitizedContent = DOMPurify.sanitize(value);
    // return angular.bypassSecurityTrustHtml(sanitizedContent);
    // return this.sanitizer.bypassSecurityTrustHtml(sanitizedContent);

  }
}
