import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenresRoutingModule } from './genres-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GenresRoutingModule,
    SharedModule
  ]
})
export class GenresModule { }
