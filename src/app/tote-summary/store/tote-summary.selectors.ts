import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { ToteSummary, ToteSummaryPage } from './tote-summary.model';
import * as fromToteSummary from './tote-summary.reducer';

export const selectToteSummaryFeature = createFeatureSelector<AppState, fromToteSummary.State>(fromToteSummary.toteSummaryFeatureKey);
export const selectTotePage = createSelector(selectToteSummaryFeature, (state: fromToteSummary.State) => state.totePage);
export const selectPageDetail = createSelector(selectTotePage, (state: ToteSummaryPage) => state.pageDetail);
export const selectToteEntries = createSelector(selectTotePage, (state: ToteSummaryPage) => state.toteEntries);


