import { Injectable } from '@angular/core';
import { BooksFrontendService } from '../frontend/books-frontend.service';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Book } from '../../model/book';
import { Observable, concatMap, map, startWith, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookValidatorService {

  constructor(private service : BooksFrontendService) { }

  isbnExists(book : Book) : AsyncValidatorFn {
    return (control : AbstractControl) : Observable<ValidationErrors | null> => {
      return this.service.getBooksByIsbn(control.value).pipe(
        map((books : Book[]) => (books.length && books.find(b => b.id !== book.id)) ? {"isbnExists" : true} : null)
      );
    }
  }

  titleExists(book : Book) : AsyncValidatorFn {
    return (control : AbstractControl) : Observable<ValidationErrors | null> => {
      return this.service.getBooksByTitle(control.value).pipe(
        map((books : Book[]) => (books.length && books.find(b => b.id !== book.id)) ? {titleExists : true} : null)
      );
    }
  }

}
