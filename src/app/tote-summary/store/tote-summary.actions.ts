import { PageRequestDetail, ToteSummaryPage } from './tote-summary.model';
import { createAction, props } from '@ngrx/store';

export const loadToteSummarys = createAction(
  '[ToteSummary] Load ToteSummarys',
  props<{ pageRequest: PageRequestDetail }>()
);

export const loadToteSummarysSuccess = createAction(
  '[ToteSummary] Load ToteSummarys Success',
  props<{ result: ToteSummaryPage }>()
);





