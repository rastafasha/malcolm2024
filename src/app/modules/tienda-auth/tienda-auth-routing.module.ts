import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendaAuthComponent } from './tienda-auth.component';
import { ListCartComponent } from './list-cart/list-cart.component';
import { ProfileClientComponent } from './profile-client/profile-client.component';
import { CourseLessonComponent } from './course-lesson/course-lesson.component';

const routes: Routes = [
  {
    path: '',component: TiendaAuthComponent,
    children:[
      {
        path:'lista', component: ListCartComponent
      },
      {
        path:'perfil-del-cliente', component: ProfileClientComponent
      },
      {
        path:'mi-curso/:slug', component: CourseLessonComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class TiendaAuthRoutingModule { }
