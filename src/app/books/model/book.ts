import { Author } from "src/app/authors/model/author";
import { Genre } from "src/app/genres/model/genre";
import { Publisher } from "src/app/publishers/model/publisher";

export interface Book {
  id: number;
  title: string;
  description: string;
  isbn13: string;
  numPages: number;
  publicationDate: Date;
  authors: Author[];
  genres: Genre[];
  publisher: Publisher;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}
