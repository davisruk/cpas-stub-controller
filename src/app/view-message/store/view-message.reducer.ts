import { createReducer, on } from '@ngrx/store';
import { loadMessageSuccess } from './view-message.actions';


export const viewMessageFeatureKey = 'viewMessage';

export interface State {
  // we only ever want to see the raw JSON, we will never need type safety
  // for this part of the Store so using any is fine.
  message: any;
}

export const initialState: State = {
  message: {}
};


export const reducer = createReducer(
  initialState,
  on(loadMessageSuccess, (state, { result }) => ({ ...state, message: result })),
);

