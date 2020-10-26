import { TestBed } from '@angular/core/testing';

import { ToteSummaryService } from '../services/tote-summary.service';

describe('ToteSummaryService', () => {
  let service: ToteSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToteSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
