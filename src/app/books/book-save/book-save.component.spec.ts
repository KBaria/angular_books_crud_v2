import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSaveComponent } from './book-save.component';

describe('BookSaveComponent', () => {
  let component: BookSaveComponent;
  let fixture: ComponentFixture<BookSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
