import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublishersRoutingModule } from './publishers-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PublishersRoutingModule,
    SharedModule
  ]
})
export class PublishersModule { }
