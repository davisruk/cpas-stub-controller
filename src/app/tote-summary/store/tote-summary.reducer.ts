import { createReducer, on } from '@ngrx/store';
import { loadToteSummarysSuccess } from './tote-summary.actions';
import { ToteSummaryPage } from './tote-summary.model';


export const toteSummaryFeatureKey = 'toteSummary';

export interface State {
  totePage: ToteSummaryPage;
}

export const initialState: State = {
  totePage: {
    toteEntries: [],
    pageDetail: {
      pageRequestDetail: {
        pageNumber: 1,
        pageSize: 10,
        searchTerm: ''
      },
      pageResponseDetail: {
        totalEntries: 0,
        totalPages: 0
      }
    }
  }
};


export const reducer = createReducer(
  initialState,
  on(loadToteSummarysSuccess, (state, { result }) => ({ ...state, totePage: result })),
);

