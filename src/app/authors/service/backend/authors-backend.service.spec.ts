import { TestBed } from '@angular/core/testing';

import { AuthorsBackendService } from './authors-backend.service';

describe('AuthorsBackendService', () => {
  let service: AuthorsBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorsBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
