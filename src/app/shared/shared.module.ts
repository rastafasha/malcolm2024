import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { BannerHomeComponent } from './banner-home/banner-home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BannerInicioComponent } from './banner-inicio/banner-inicio.component';
import { BannerSolucionesComponent } from './banner-soluciones/banner-soluciones.component';
import { HeaderPagesComponent } from './header-pages/header-pages.component';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// export function cargarTraductor(http:HttpClient){
//   return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
// }
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MobileMenuComponent,
    BannerHomeComponent,
    BannerInicioComponent,
    BannerSolucionesComponent,
    HeaderPagesComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MobileMenuComponent,
    BannerHomeComponent,
    BannerInicioComponent,
    BannerSolucionesComponent,
    HeaderPagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    TranslateModule,
    HttpClientModule,
    // TranslateModule.forRoot({
    //     loader: {
    //         provide: TranslateLoader,
    //         useFactory: (cargarTraductor),
    //         deps: [HttpClient]
    //     }
    // })
  ]
})
export class SharedModule { }
