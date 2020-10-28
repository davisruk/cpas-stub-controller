import { createAction, props } from '@ngrx/store';

export const loadMessage = createAction(
  '[ViewMessage] Load Message',
  props<{ msgId: number }>()
);

export const loadMessageSuccess = createAction(
  '[ViewMessage] Load Message Success',
  props<{ result: any }>()
);

export const messageViewReset = createAction(
  '[ViewMessage] Reset Message'
);

