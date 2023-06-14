import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookSaveComponent } from './book-save/book-save.component';


@NgModule({
  declarations: [
    BookListComponent,
    BookDetailsComponent,
    BookSaveComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    SharedModule
  ],
  exports: [
    BooksRoutingModule
  ]
})
export class BooksModule { }
