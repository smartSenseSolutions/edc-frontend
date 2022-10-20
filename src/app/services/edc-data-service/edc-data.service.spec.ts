import { TestBed } from '@angular/core/testing';

import { EdcDataService } from './edc-data.service';

describe('EdcDataService', () => {
  let service: EdcDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EdcDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
