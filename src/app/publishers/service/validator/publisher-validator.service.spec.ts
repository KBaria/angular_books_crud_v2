import { TestBed } from '@angular/core/testing';

import { PublisherValidatorService } from './publisher-validator.service';

describe('PublisherValidatorService', () => {
  let service: PublisherValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublisherValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
