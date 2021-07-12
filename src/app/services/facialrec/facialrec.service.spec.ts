import { TestBed } from '@angular/core/testing';

import { FacialrecService } from './facialrec.service';

describe('FacialrecService', () => {
  let service: FacialrecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacialrecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
