import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { DspLiveStatsEffects } from '../store/dsp-live-stats.effects';


describe('DspLiveStatsEffects', () => {
  let actions$: Observable<any>;
  let effects: DspLiveStatsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DspLiveStatsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(DspLiveStatsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
