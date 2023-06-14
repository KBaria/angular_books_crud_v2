import { Injectable } from '@angular/core';
import { PublishersBackendService } from 'src/app/publishers/service/backend/publishers-backend.service';
import { GenresBackendService } from '../backend/genres-backend.service';
import { Genre } from '../../model/genre';

@Injectable({
  providedIn: 'root',
})
export class GenresFrontendService {
  constructor(private service: GenresBackendService) {}

  getAllGenres() {
    return this.service.getAllGenres();
  }

  getGenreById(id: number) {
    return this.service.getGenreById(id);
  }

  getGenresByName(name: string) {
    return this.service.getGenresByName(name);
  }

  getGenresByNameLike(pattern: string) {
    return this.service.getGenresByNameLike(pattern);
  }

  defaultGenre() {
    return {
      id: 0,
      genreName: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false
    } as Genre;
  }

}
