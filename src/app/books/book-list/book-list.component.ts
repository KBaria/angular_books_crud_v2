import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { faEdit, faTrashCan, faBookMedical } from '@fortawesome/free-solid-svg-icons';
import { Book } from '../model/book';
import { BooksFrontendService } from '../service/frontend/books-frontend.service';
import { catchError, map, merge, of, startWith, switchMap } from 'rxjs';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements AfterViewInit {
  faTrashCan = faTrashCan;
  faEdit = faEdit;
  faBookMedical = faBookMedical;
  tableColumns = ['id', 'isbn', 'title', 'authors', 'genres', 'actions'];

  resultsLength = 0;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  data : Book[] = [];

  constructor(private service : BooksFrontendService) { }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => this.service.getBooksPaginated(this.paginator.pageIndex + 1, this.paginator.pageSize)),
      map(data => {
        let totalCount = data.headers.get("X-Total-Count");
        this.resultsLength = totalCount ? +totalCount : 0;
        return data.body ? data.body : [];
      })
    ).subscribe({
      next: data => this.data = data
    });
  }

}
