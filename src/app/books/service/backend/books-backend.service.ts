import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../../model/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksBackendService {

  private baseUrl = "http://localhost:3000/books";

  constructor(private http : HttpClient) { }

  getAllBooks() {
    return this.http.get<Book[]>(this.baseUrl);
  }

  getBooksPaginated(page : number, size: number) {
    return this.http.get<Book[]>(`${this.baseUrl}?_page=${page}&_limit=${size}`, {observe: 'response'});
  }

  getBookById(id : number) {
    return this.http.get<Book>(`${this.baseUrl}/${id}`);
  }

  getBookByTitle(title : string) {
    return this.http.get<Book[]>(`${this.baseUrl}?title=${title}`);
  }

  getBookByIsbn(isbn13 : string) {
    return this.http.get<Book[]>(`${this.baseUrl}?isbn13=${isbn13}`);
  }
  
}
