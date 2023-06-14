import { Injectable } from '@angular/core';
import { PublishersFrontendService } from '../frontend/publishers-frontend.service';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { Publisher } from '../../model/publisher';

@Injectable({
  providedIn: 'root'
})
export class PublisherValidatorService {

  constructor(private service : PublishersFrontendService) { }

  publisherNameExists() : AsyncValidatorFn {
    return (control : AbstractControl) : Observable<ValidationErrors | null> => {
      return this.service.getPublishersByName(control.value).pipe(
        map((publishers : Publisher[]) => 
          (publishers.length) ? {publisherNameExists : true} : null)
      );
    }
  }

}
