import { TestBed } from '@angular/core/testing';

import { SearchMainService } from './search-main.service';

describe('SearchMainService', () => {
  let service: SearchMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
