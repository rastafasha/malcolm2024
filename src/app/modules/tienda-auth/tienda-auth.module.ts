import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiendaAuthRoutingModule } from './tienda-auth-routing.module';
import { TiendaAuthComponent } from './tienda-auth.component';
import { ListCartComponent } from './list-cart/list-cart.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileClientComponent } from './profile-client/profile-client.component';
import { CourseLessonComponent } from './course-lesson/course-lesson.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    TiendaAuthComponent,
    ListCartComponent,
    ProfileClientComponent,
    CourseLessonComponent
  ],
  exports: [
    TiendaAuthComponent,
    ListCartComponent
  ],
  imports: [
    CommonModule,
    TiendaAuthRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ComponentsModule
  ]
})
export class TiendaAuthModule { }
