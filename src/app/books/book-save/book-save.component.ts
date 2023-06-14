import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { EMPTY, Subscription, concatMap, startWith } from 'rxjs';
import { Author } from 'src/app/authors/model/author';
import { AuthorsFrontendService } from 'src/app/authors/service/frontend/authors-frontend.service';
import { Genre } from 'src/app/genres/model/genre';
import { GenresFrontendService } from 'src/app/genres/service/frontend/genres-frontend.service';
import { PublishersFrontendService } from 'src/app/publishers/service/frontend/publishers-frontend.service';
import { PublisherValidatorService } from 'src/app/publishers/service/validator/publisher-validator.service';
import { Book } from '../model/book';
import { BooksFrontendService } from '../service/frontend/books-frontend.service';
import { BookValidatorService } from '../service/validator/book-validator.service';
import { AuthorValidatorService } from 'src/app/authors/service/validator/author-validator.service';
import { GenreValidatorService } from 'src/app/genres/service/validator/genre-validator.service';

export interface ChipItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-book-save',
  templateUrl: './book-save.component.html',
  styleUrls: ['./book-save.component.css']
})
export class BookSaveComponent implements OnInit {

  cardTitle = "Add new book";

  faPlus = faPlus;
  faTrashCan = faTrashCan;

  @ViewChild('authorSearchInput') authorSearchInput !: ElementRef<HTMLInputElement>;
  @ViewChild('genreSearchInput') genreSearchInput !: ElementRef<HTMLInputElement>;

  @ViewChild('newAuthorInput') newAuthorInput !: ElementRef<HTMLInputElement>;
  @ViewChild('newGenreInput') newGenreInput !: ElementRef<HTMLInputElement>;

  separatorKeysCodes : number[] = [COMMA, ENTER];

  book : Book = this.service.defaultBook();

  bookForm = this.fb.group({
    isbn: ['', [Validators.required], [this.bookValidator.isbnExists(this.book)]],
    title: ['', [Validators.required], [this.bookValidator.titleExists(this.book)]],
    pages: [0, [Validators.required]],
    description: ['', [Validators.required]],
    publisher: this.fb.group({
      publisherType: ['existing'],
      publisherSelect: [[] as number[], [Validators.required]],
      publisherSearch: [''],
      publicationDate: [new Date(), [Validators.required]],
      newPublisher: ['']
    }),
    authors: this.fb.group({
      authorsSearch: [''],
      authorsSelect: [[] as number[], [Validators.required]],
      newAuthors: this.fb.array([])
    }),
    genres: this.fb.group({
      genresSearch: [''],
      genresSelect: [[] as number[], [Validators.required]],
      newGenres: this.fb.array([])
    }),
  });

  filteredPublishers$ = this.publisherSearchControl.valueChanges.pipe(
    startWith<string>(''),
    concatMap(value => this.publisherService.getPublishersByNameLike(value || ''))
  );

  filteredAuthors$ = this.authorSearchControl.valueChanges.pipe(
    startWith<string>(''),
    concatMap(value => this.authorService.getAuthorsByNameLike(value || ''))
  );
  authorChips : ChipItem[] = [];
  newAuthors : Author[] = [];

  filteredGenres$ = this.genreSearchControl.valueChanges.pipe(
    startWith<string>(''),
    concatMap(value => this.genreService.getGenresByNameLike(value || ''))
  );
  genreChips : ChipItem[] = [];
  newGenres : Genre[] = [];

  bookSubscription !: Subscription;
  publisherTypeSubscription : Subscription | undefined;

  constructor(private service : BooksFrontendService, private publisherService : PublishersFrontendService,
    private authorService : AuthorsFrontendService, private genreService : GenresFrontendService, 
    private route : ActivatedRoute, private fb : FormBuilder, 
    private bookValidator : BookValidatorService , private publisherValidator : PublisherValidatorService,
    private authorValidator : AuthorValidatorService, private genreValidator : GenreValidatorService) { }
  
  ngOnInit(): void {
    this.publisherTypeSubscription = 
    this.publisherTypeControl.valueChanges.subscribe({
      next: value => {
        if(value === 'existing') {
          this.publisherSelectControl.setValidators(Validators.required);
          this.clearRequiredValidator(this.newPublisherControl);

          this.newPublisherControl.clearAsyncValidators();
          this.newPublisherControl.updateValueAndValidity();
        }else {
          this.clearRequiredValidator(this.publisherSelectControl);
          this.setRequiredValidators(this.newPublisherControl);

          this.newPublisherControl.setAsyncValidators(this.publisherValidator.publisherNameExists());
          this.newPublisherControl.updateValueAndValidity();
        }
      }
    });

    this.bookSubscription = this.route.params.pipe(
      concatMap(param => param["id"] ? this.service.getBookById(+param["id"]) : EMPTY)
    ).subscribe({
      next: (data : Book) => {
        if(data) {
          this.populateBookForm(data);
        }
      }
    });
  }

  populateBookForm(book : Book) {
    this.cardTitle = "Edit book"
    this.book = book;

    this.bookForm.get("isbn")?.clearAsyncValidators();
    this.bookForm.get("isbn")?.setAsyncValidators(this.bookValidator.isbnExists(book));

    this.bookForm.get("title")?.clearAsyncValidators();
    this.bookForm.get("title")?.setAsyncValidators(this.bookValidator.titleExists(book));

    this.bookForm.patchValue({
      isbn: book.isbn13,
      title: book.title,
      pages: book.numPages,
      description: book.description,
      publisher: {
        publicationDate: book.publicationDate,
        publisherSelect: [book.publisher.id]
      },
      authors: {
        authorsSelect: book.authors.map(a => a.id)
      },
      genres: {
        genresSelect: book.genres.map(g => g.id)
      }
    });

    this.authorChips = book.authors.map(a => ({value: a.id, viewValue: a.authorName} as ChipItem));
    this.genreChips = book.genres.map(g => ({value: g.id, viewValue: g.genreName} as ChipItem));
    this.bookForm.updateValueAndValidity();
  }

  get publisherTypeControl() : FormControl {
    return this.bookForm.get("publisher")?.get("publisherType") as FormControl;
  }

  get publisherSearchControl() : FormControl {
    return this.bookForm.get("publisher")?.get("publisherSearch") as FormControl;
  }

  get publisherSelectControl() : FormControl {
    return this.bookForm.get("publisher")?.get("publisherSelect") as FormControl;
  }

  get newPublisherControl() : FormControl {
    return this.bookForm.get("publisher")?.get("newPublisher") as FormControl;
  }

  get authorSearchControl() : FormControl {
    return this.bookForm.get("authors")?.get("authorsSearch") as FormControl;
  }

  get authorsSelectControl() : FormControl {
    return this.bookForm.get("authors")?.get("authorsSelect") as FormControl;
  }

  get genreSearchControl() : FormControl {
    return this.bookForm.get("genres")?.get("genresSearch") as FormControl;
  }

  get genresSelectControl() : FormControl {
    return this.bookForm.get("genres")?.get("genresSelect") as FormControl;
  }

  addAuthorChip(event : MatChipInputEvent) {
    this.addChip(event, this.authorSearchControl);
  }

  removeAuthorChip(index : number) {
    this.removeChip(index, this.authorChips);
  }

  handleAuthorOptionSelectedEvent(event : MatAutocompleteSelectedEvent) {
    this.handleOptionSelectedEvent(event, this.authorChips, this.authorSearchControl, 
      this.authorsSelectControl, this.authorSearchInput);
  }

  addGenreChip(event : MatChipInputEvent) {
    this.addChip(event, this.genreSearchControl);
  }

  removeGenreChip(index : number) {
    this.removeChip(index, this.genreChips);
  }

  handleGenreOptionSelectedEvent(event : MatAutocompleteSelectedEvent) {
    this.handleOptionSelectedEvent(event, this.genreChips, this.genreSearchControl, 
      this.genresSelectControl, this.genreSearchInput);
  }

  addChip(event : MatChipInputEvent, searchControl : FormControl) {
    event.chipInput.clear();
    searchControl.setValue(null);
  }

  removeChip(index : number, chipList : ChipItem[]) {
    chipList.splice(index, 1);
  }

  handleOptionSelectedEvent(event : MatAutocompleteSelectedEvent, chipList : ChipItem[], searchControl : FormControl, selectControl : FormControl, inputElement : ElementRef<HTMLInputElement>) {
    if(!chipList.find(c => c.value === event.option.value)) {
      chipList.push({value: event.option.value, viewValue: event.option.viewValue});
      selectControl.setValue([...selectControl.value, event.option.value]);
    }
    inputElement.nativeElement.value = "";
    searchControl.setValue(null);
  }

  get newAuthorsFormArray() : FormArray {
    return this.bookForm.get("authors")?.get("newAuthors") as FormArray;
  }

  newAuthorFormGroup() {
    return this.fb.group({
      newAuthor: ['', [Validators.required, RxwebValidators.unique()], 
      [this.authorValidator.authorNameExists()]]
    });
  }

  addNewAuthorGroup() {
    this.newAuthorsFormArray.push(this.newAuthorFormGroup());
    // if(this.newAuthorsFormArray.length === 1) {
    //   this.clearRequiredValidator(this.authorSearchControl);
    //   this.setRequiredValidators(this.newAuthorsFormArray);
    // }
  }

  removeNewAuthorGroup(index : number) {
    this.newAuthorsFormArray.removeAt(index);
    // if(this.newAuthorsFormArray.length === 0) {
    //   this.setRequiredValidators(this.authorSearchControl);
    //   this.clearRequiredValidator(this.newAuthorsFormArray);
    // }
  }

  get newGenresFormArray() : FormArray {
    return this.bookForm.get("genres")?.get("newGenres") as FormArray;
  }

  newGenreFormGroup() {
    return this.fb.group({
      newGenre: ['', [Validators.required, RxwebValidators.unique()], [this.genreValidator.genreNameExists()]]
    });
  }

  addNewGenreGroup() {
    this.newGenresFormArray.push(this.newGenreFormGroup());
    // if(this.newGenresFormArray.length === 1) {
    //   this.clearRequiredValidator(this.genresSelectControl);
    //   this.setRequiredValidators(this.newGenresFormArray);
    // }
  }

  removeNewGenreGroup(index : number) {
    this.newGenresFormArray.removeAt(index);
    // if(this.newGenresFormArray.length === 0) {
    //   this.setRequiredValidators(this.genresSelectControl);
    //   this.clearRequiredValidator(this.newGenresFormArray);
    // }
  }

  setRequiredValidators(control : FormControl | FormArray) {
    control.setValidators(Validators.required);
    control.updateValueAndValidity();
  }

  clearRequiredValidator(control : FormControl | FormArray) {
    control.clearValidators();
    control.updateValueAndValidity();
  }

}
