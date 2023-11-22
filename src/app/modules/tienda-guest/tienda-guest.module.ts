import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiendaGuestRoutingModule } from './tienda-guest-routing.module';
import { TiendaGuestComponent } from './tienda-guest.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FilterCoursesComponent } from './filter-courses/filter-courses.component';


@NgModule({
  declarations: [
    TiendaGuestComponent,
    CourseDetailComponent,
    FilterCoursesComponent
  ],
  exports: [
    TiendaGuestComponent,
    CourseDetailComponent,
    FilterCoursesComponent
  ],
  imports: [
    CommonModule,
    TiendaGuestRoutingModule,
    //
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ]
})
export class TiendaGuestModule { }
