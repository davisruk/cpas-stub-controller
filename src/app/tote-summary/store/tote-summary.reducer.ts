import { loadToteSummarysSuccess } from './tote-summary.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { PageDetail, ToteSummaryPage } from './tote-summary.model';


export const toteSummaryFeatureKey = 'toteSummary';

export interface State {
  totePage: ToteSummaryPage;
}

export const initialState: State = {
  totePage: {
    toteEntries: [],
    pageDetail: {
      pageRequest: {
      pageNumber: 1,
      pageSize: 10
      },
      pageResponse: {
        totalEntries: 0,
        totalPages: 0
      }
    }
  }
};


export const reducer = createReducer(
  initialState,
  on(loadToteSummarysSuccess,  (state, { result }) => ({ ...state, totePage: result})),
);

