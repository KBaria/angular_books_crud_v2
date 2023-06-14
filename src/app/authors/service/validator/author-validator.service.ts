import { Injectable } from '@angular/core';
import { AuthorsFrontendService } from '../frontend/authors-frontend.service';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { Author } from '../../model/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorValidatorService {

  constructor(private service : AuthorsFrontendService) { }

  authorNameExists() : AsyncValidatorFn {
    return (control : AbstractControl) : Observable<ValidationErrors | null> => {
      return this.service.getAuthorsByName(control.value).pipe(
        map((authors : Author[]) => (authors.length) ? {authorNameExists : true} : null)
      );
    }
  }

}
