import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { GraficoComponent } from './portafolio/grafico/grafico.component';
import { AboutComponent } from './about/about.component';
import { SolucionesWebComponent } from './soluciones-web/soluciones-web.component';
import { ByCategoryComponent } from './by-category/by-category.component';
import { ContactFormComponent } from '../cmspage/contact-form/contact-form.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { FoliomovilComponent } from './portafolio/foliomovil/foliomovil.component';

const childRoutes: Routes = [

    { path: '',  component: InicioComponent, },
    // { path: 'portafolio/:slug', component: GraficoComponent },
    { path: 'portafolio/category/:id', component: ByCategoryComponent },
    { path: 'portafolio-movil', component: FoliomovilComponent },
    { path: 'acerca-de',  component: AboutComponent, },
    { path: 'soluciones-web',  component: SolucionesWebComponent, },
    { path: 'blog',  component: BlogComponent, },
    { path: 'blog/:slug',  component: BlogDetailComponent, },
    { path: 'contact',  component: ContactFormComponent, },
    

]

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoute),
    RouterModule.forChild(childRoutes),
  ],
    exports: [ RouterModule ]
})
export class ChildRoutesModule { }
