import {
    createFeatureSelector,
    createSelector,
  } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import * as fromConfig from './config.reducer';

export const selectConfigFeature = createFeatureSelector<AppState, fromConfig.State>(fromConfig.configFeatureKey);
export const selectReleasing = createSelector(selectConfigFeature, (state: fromConfig.State) => state.releasing);
export const selectFMD = createSelector(selectConfigFeature, (state: fromConfig.State) => state.includeFMD);
export const select32RShort = createSelector(selectConfigFeature, (state: fromConfig.State) => state.sendThirtyTwoRShort);
export const selectToteRelease = createSelector(selectConfigFeature, (state: fromConfig.State) => state.toteReleaseInterval);
export const selectToteTravelTime = createSelector(selectConfigFeature, (state: fromConfig.State) => state.toteTrackTravelTime);
export const selectMaxTotes = createSelector(selectConfigFeature, (state: fromConfig.State) => state.maxTotesOnTrack);
