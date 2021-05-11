import { TestBed } from '@angular/core/testing';

import { InsiteKitService } from './insite-kit.service';

describe('InsiteKitService', () => {
  let service: InsiteKitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsiteKitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
