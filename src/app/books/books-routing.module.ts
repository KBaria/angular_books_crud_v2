import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookSaveComponent } from './book-save/book-save.component';

const routes: Routes = [
  {path: "books", component: BookListComponent},
  {path: "books", children: [
    {path: "add", component: BookSaveComponent},
    {path: "edit/:id", component: BookSaveComponent},
    {path: ":id", component: BookDetailsComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
