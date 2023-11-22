import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AboutComponent } from './about/about.component';
import { SolucionesWebComponent } from './soluciones-web/soluciones-web.component';
import { GraficoComponent } from './portafolio/grafico/grafico.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesComponent } from './pages.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { ByCategoryComponent } from './by-category/by-category.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { FoliomovilComponent } from './portafolio/foliomovil/foliomovil.component';



@NgModule({
  declarations: [
    InicioComponent,
    AboutComponent,
    SolucionesWebComponent,
    GraficoComponent,
    PagesComponent,
    ByCategoryComponent,
    BlogComponent,
    BlogDetailComponent,
    FoliomovilComponent
  ],
  exports: [
    InicioComponent,
    AboutComponent,
    SolucionesWebComponent,
    GraficoComponent,
    PagesComponent,
    ByCategoryComponent,
    BlogComponent,
    BlogDetailComponent,
    FoliomovilComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentsModule,
    PipesModule
  ]
})
export class PagesModule { }
