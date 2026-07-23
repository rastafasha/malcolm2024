import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CmspageRoutingModule } from './cmspage-routing.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ContactFormComponent } from './contact-form/contact-form.component';

@NgModule({ declarations: [
        ContactFormComponent
    ],
    exports: [
        ContactFormComponent
    ], imports: [CommonModule,
        FormsModule,
        CmspageRoutingModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class CmspageModule { }
