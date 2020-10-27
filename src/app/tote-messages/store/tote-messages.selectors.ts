import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { ToteMessageSummary } from './messages.model';
import * as fromToteMessages from './tote-messages.reducer';

export const selectToteMessagesFeature =
    createFeatureSelector<AppState, fromToteMessages.State>(fromToteMessages.toteMessagesFeatureKey);

export const selectToteMessagesSummary = createSelector(selectToteMessagesFeature, (state: fromToteMessages.State) => state.toteMessages);
export const selectToteRawMessages = createSelector(selectToteMessagesSummary, (state: ToteMessageSummary) => state.messages);
