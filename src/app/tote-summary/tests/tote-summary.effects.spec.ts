import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ToteSummaryEffects } from '../store/tote-summary.effects';

describe('ToteSummaryEffects', () => {
  let actions$: Observable<any>;
  let effects: ToteSummaryEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ToteSummaryEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ToteSummaryEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
