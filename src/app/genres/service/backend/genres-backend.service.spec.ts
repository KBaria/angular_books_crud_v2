import { TestBed } from '@angular/core/testing';

import { GenresBackendService } from './genres-backend.service';

describe('GenresBackendService', () => {
  let service: GenresBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenresBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
