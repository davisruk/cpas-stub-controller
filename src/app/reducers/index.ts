import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromConfig from '../config/store/config.reducer';
import * as fromDspLiveStats from '../dsp-live-stats/store/dsp-live-stats.reducer';
import * as fromToteSummary from '../tote-summary/store/tote-summary.reducer';


export interface AppState {

  [fromConfig.configFeatureKey]: fromConfig.State;
  [fromDspLiveStats.dspLiveStatsFeatureKey]: fromDspLiveStats.State;
  [fromToteSummary.toteSummaryFeatureKey]: fromToteSummary.State;
}

export const reducers: ActionReducerMap<AppState> = {

  [fromConfig.configFeatureKey]: fromConfig.reducer,
  [fromDspLiveStats.dspLiveStatsFeatureKey]: fromDspLiveStats.reducer,
  [fromToteSummary.toteSummaryFeatureKey]: fromToteSummary.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
