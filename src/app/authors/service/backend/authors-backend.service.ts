import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '../../model/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorsBackendService {

  private baseUrl = "http://localhost:3000/authors"

  constructor(private http : HttpClient) { }

  getAllAuthors() {
    return this.http.get<Author[]>(this.baseUrl);
  }

  getAuthorById(id : number) {
    return this.http.get<Author>(`${this.baseUrl}/${id}`);
  }

  getAuthorsByName(name : string) {
    return this.http.get<Author[]>(`${this.baseUrl}?authorName=${name}`);
  }

  getAuthorsByNameLike(pattern : string) {
    return this.http.get<Author[]>(`${this.baseUrl}?authorName_like=${pattern}`);
  }

}
