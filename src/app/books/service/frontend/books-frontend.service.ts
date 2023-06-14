import { Injectable } from '@angular/core';
import { BooksBackendService } from '../backend/books-backend.service';
import { PublishersFrontendService } from 'src/app/publishers/service/frontend/publishers-frontend.service';
import { Book } from '../../model/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksFrontendService {

  constructor(private service : BooksBackendService, private publisherService : PublishersFrontendService) { }

  getAllBooks() {
    return this.service.getAllBooks();
  }

  getBooksPaginated(page : number, size: number) {
    return this.service.getBooksPaginated(page, size);
  }

  getBookById(id : number) {
    return this.service.getBookById(id);
  }

  getBooksByTitle(title : string) {
    return this.service.getBookByTitle(title);
  }

  getBooksByIsbn(isbn13 : string) {
    return this.service.getBookByIsbn(isbn13);
  }

  defaultBook() {
    return {
      id: 0,
      title: "",
      description: "",
      isbn13: "",
      numPages: 0,
      publicationDate: new Date(),
      authors: [],
      genres: [],
      publisher: this.publisherService.defaultPublisher(),
      review: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false
    } as Book;
  }

}
