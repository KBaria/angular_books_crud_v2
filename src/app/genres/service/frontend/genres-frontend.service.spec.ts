import { TestBed } from '@angular/core/testing';

import { GenresFrontendService } from './genres-frontend.service';

describe('GenresFrontendService', () => {
  let service: GenresFrontendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenresFrontendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
