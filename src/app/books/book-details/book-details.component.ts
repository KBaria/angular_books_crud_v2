import { Component } from '@angular/core';
import { BooksFrontendService } from '../service/frontend/books-frontend.service';
import { ActivatedRoute } from '@angular/router';
import { concatMap } from 'rxjs';
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {

  faEdit = faEdit;
  faTrashCan = faTrashCan;

  colors = ["264653", "2A9D8F", "E9C46A", "F4A261", "E76F51"];
  getRandomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }
  imageUrl = `https://placehold.co/250x350/${this.getRandomColor()}/FFFFFF`;

  selectedBook$ = this.route.params.pipe(
    concatMap(params => this.service.getBookById(params["id"]))
  );

  constructor(private service : BooksFrontendService, private route : ActivatedRoute) { }

}
