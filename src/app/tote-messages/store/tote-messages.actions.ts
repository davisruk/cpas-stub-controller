import { createAction, props } from '@ngrx/store';
import { ToteMessageSummary } from './messages.model';

export const loadToteMessages = createAction(
  '[ToteMessages] Load ToteMessages',
  props<{ toteId: number }>()
);

export const loadToteMessagesSuccess = createAction(
  '[ToteMessages] Load ToteMessages Success',
  props<{ result: ToteMessageSummary }>()
);




