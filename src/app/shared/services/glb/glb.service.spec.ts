import { TestBed } from '@angular/core/testing';

import { GlbService } from './glb.service';

describe('GlbService', () => {
  let service: GlbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
