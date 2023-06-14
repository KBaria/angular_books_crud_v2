import { TestBed } from '@angular/core/testing';

import { PublishersBackendService } from './publishers-backend.service';

describe('PublishersBackendService', () => {
  let service: PublishersBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublishersBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
