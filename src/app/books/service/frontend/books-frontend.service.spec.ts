import { TestBed } from '@angular/core/testing';

import { BooksFrontendService } from './books-frontend.service';

describe('BooksFrontendService', () => {
  let service: BooksFrontendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksFrontendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
