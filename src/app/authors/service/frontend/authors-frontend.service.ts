import { Injectable } from '@angular/core';
import { AuthorsBackendService } from '../backend/authors-backend.service';
import { Author } from '../../model/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorsFrontendService {

  constructor(private service : AuthorsBackendService) { }

  getAllAuthors() {
    return this.service.getAllAuthors();
  }

  getAuthorById(id : number) {
    return this.service.getAuthorById(id);
  }

  getAuthorsByName(name : string) {
    return this.service.getAuthorsByName(name);
  }

  getAuthorsByNameLike(pattern : string) {
    return this.service.getAuthorsByNameLike(pattern);
  }

  defaultAuthor() {
    return {
      id: 0,
      authorName: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false
    } as Author;
  }

}
