import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import * as fromViewMessage from './view-message.reducer';

export const selectViewMessageFeature = createFeatureSelector<AppState, fromViewMessage.State>(fromViewMessage.viewMessageFeatureKey);
export const selectMessage = createSelector(selectViewMessageFeature, (state: fromViewMessage.State) => state.message);
