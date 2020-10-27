import { createReducer, on } from '@ngrx/store';
import { ToteMessageSummary } from './messages.model';
import { loadToteMessagesSuccess } from './tote-messages.actions';


export const toteMessagesFeatureKey = 'toteMessages';

export interface State {
  toteMessages: ToteMessageSummary;
}

export const initialState: State = {
  toteMessages: {
    toteId: 0,
    messages: []
  }
};

export const reducer = createReducer(
  initialState,
  on(loadToteMessagesSuccess, (state, { result }) => ({ ...state, toteMessages: result })),
);

