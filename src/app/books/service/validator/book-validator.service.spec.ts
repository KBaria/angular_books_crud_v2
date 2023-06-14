import { TestBed } from '@angular/core/testing';

import { BookValidatorService } from './book-validator.service';

describe('BookValidatorService', () => {
  let service: BookValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
