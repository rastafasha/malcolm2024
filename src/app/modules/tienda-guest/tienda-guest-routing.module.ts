import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendaGuestComponent } from './tienda-guest.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { FilterCoursesComponent } from './filter-courses/filter-courses.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FilterProductsComponent } from './filter-products/filter-products.component';

const routes: Routes = [
  {
    path: '',component: TiendaGuestComponent,
    children:[
      {
        path:'landing-curso/:slug', component: CourseDetailComponent
      },
      {
        path:'landing-product/:slug', component: ProductDetailComponent      },
      {
        path:'listado-de-cursos', component: FilterCoursesComponent
      },
      {
        path:'listado-de-productos', component: FilterProductsComponent
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TiendaGuestRoutingModule { }
