import { TestBed } from '@angular/core/testing';

import { GenreValidatorService } from './genre-validator.service';

describe('GenreValidatorService', () => {
  let service: GenreValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenreValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
