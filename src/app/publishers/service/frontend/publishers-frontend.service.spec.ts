import { TestBed } from '@angular/core/testing';

import { PublishersFrontendService } from './publishers-frontend.service';

describe('PublishersFrontendService', () => {
  let service: PublishersFrontendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublishersFrontendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
