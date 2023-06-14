import { TestBed } from '@angular/core/testing';

import { AuthorValidatorService } from './author-validator.service';

describe('AuthorValidatorService', () => {
  let service: AuthorValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
