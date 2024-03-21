import { TestBed } from '@angular/core/testing';

import { DataGridServiceService } from './data-grid-service.service';

describe('DataGridServiceService', () => {
  let service: DataGridServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataGridServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
