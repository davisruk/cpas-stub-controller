import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import * as fromLiveStats from './dsp-live-stats.reducer';

export const selectLiveStatsFeature = createFeatureSelector<AppState, fromLiveStats.State>(fromLiveStats.dspLiveStatsFeatureKey);
export const selectTrackStatus = createSelector(selectLiveStatsFeature, (state: fromLiveStats.State) => state.trackStatus);
