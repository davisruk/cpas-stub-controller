import {
    createFeatureSelector,
    createSelector,
  } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import * as fromConfig from './config.reducer';

export const selectConfigFeature = createFeatureSelector<AppState, fromConfig.State>(fromConfig.configFeatureKey);
export const selectFMD = createSelector(selectConfigFeature, (state: fromConfig.State) => state.includeFMD);
