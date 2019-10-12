import { TestBed } from '@angular/core/testing';

import { LoopserviceService } from './loopservice.service';

describe('LoopserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoopserviceService = TestBed.get(LoopserviceService);
    expect(service).toBeTruthy();
  });
});
