import { createAction, props } from '@ngrx/store';
import { PageRequestDetail, ToteSummaryPage } from './tote-summary.model';

export const loadToteSummarys = createAction(
  '[ToteSummary] Load ToteSummarys',
  props<{ pageRequest: PageRequestDetail }>()
);

export const loadToteSummarysSuccess = createAction(
  '[ToteSummary] Load ToteSummarys Success',
  props<{ result: ToteSummaryPage }>()
);

export const resetToteSummarys = createAction(
  '[ToteSummary] Reset ToteSummarys'
);




