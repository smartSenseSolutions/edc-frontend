import { TestBed } from '@angular/core/testing';

import { EdcService } from './edc.service';

describe('EdcService', () => {
  let service: EdcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EdcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
