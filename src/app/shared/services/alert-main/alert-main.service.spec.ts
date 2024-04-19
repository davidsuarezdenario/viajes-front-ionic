import { TestBed } from '@angular/core/testing';

import { AlertMainService } from './alert-main.service';

describe('AlertMainService', () => {
  let service: AlertMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
