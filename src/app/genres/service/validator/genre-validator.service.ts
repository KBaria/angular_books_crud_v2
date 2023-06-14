import { Injectable } from '@angular/core';
import { GenresFrontendService } from '../frontend/genres-frontend.service';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { Genre } from '../../model/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreValidatorService {

  constructor(private service : GenresFrontendService) { }

  genreNameExists() : AsyncValidatorFn {
    return (control : AbstractControl) : Observable<ValidationErrors | null> => {
      return this.service.getGenresByName(control.value).pipe(
        map((genres : Genre[]) => (genres.length) ? {genreNameExists : true} : null)
      );
    }
  }

}
