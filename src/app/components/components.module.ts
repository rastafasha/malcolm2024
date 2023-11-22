import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalgraficoComponent } from './modalgrafico/modalgrafico.component';
import { PipesModule } from '../pipes/pipes.module';
import { EndesarolloComponent } from './endesarollo/endesarollo.component';



@NgModule({
  declarations: [
    ModalgraficoComponent,
    EndesarolloComponent,
  ],
  exports: [
    ModalgraficoComponent,
    EndesarolloComponent
  ],
  imports: [
    CommonModule,
    PipesModule
  ]
})
export class ComponentsModule { }
