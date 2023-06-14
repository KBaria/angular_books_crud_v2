import { TestBed } from '@angular/core/testing';

import { AuthorsFrontendService } from './authors-frontend.service';

describe('AuthorsFrontendService', () => {
  let service: AuthorsFrontendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorsFrontendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
