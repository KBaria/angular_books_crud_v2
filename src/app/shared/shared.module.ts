import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    FontAwesomeModule
  ]
})
export class SharedModule { }
