import { TestBed } from '@angular/core/testing';

import { CountryPushService } from './country-push.service';

describe('CountryPushService', () => {
  let service: CountryPushService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryPushService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
