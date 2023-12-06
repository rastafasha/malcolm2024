import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalgraficoComponent } from './modalgrafico/modalgrafico.component';
import { PipesModule } from '../pipes/pipes.module';
import { EndesarolloComponent } from './endesarollo/endesarollo.component';
import { BtnLocalizacionComponent } from './btn-localizacion/btn-localizacion.component';
import { CargandomapaComponent } from './cargandomapa/cargandomapa.component';
import { MapavistaComponent } from './mapavista/mapavista.component';
import { MapaguardadoComponent } from './mapaguardado/mapaguardado.component';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ModalgraficoComponent,
    EndesarolloComponent,
    BtnLocalizacionComponent,
    MapavistaComponent,
    CargandomapaComponent,
    MapaguardadoComponent,
    ProductsComponent
  ],
  exports: [
    ModalgraficoComponent,
    EndesarolloComponent,
    BtnLocalizacionComponent,
    MapavistaComponent,
    CargandomapaComponent,
    MapaguardadoComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    HttpClientModule,
    RouterModule,
  ]
})
export class ComponentsModule { }
