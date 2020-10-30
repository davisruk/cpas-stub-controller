import { createReducer, on } from '@ngrx/store';
import { loadMessageSuccess, messageViewReset } from './view-message.actions';
import { ToteMessage } from './view-message.model';

export const viewMessageFeatureKey = 'viewMessage';
export interface State {
  toteMessage: ToteMessage;
}

const initialState: State = {
  toteMessage: {
    message: {},
    rawMessage: ''
  }
};

export const reducer = createReducer(
  initialState,
  on(loadMessageSuccess, (state, { result }) => ({ ...state, toteMessage: result })),
  on(messageViewReset, (state) => initialState),
);

