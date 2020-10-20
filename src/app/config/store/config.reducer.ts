import { updateFMD } from './config.actions';
import { createReducer, on } from '@ngrx/store';


export const configFeatureKey = 'config';

export interface State {
  toteReleaseInterval: number;
  toteTrackTravelTime: number;
  maxTotesOnTrack: number;
  releasing: boolean;
  includeFMD: boolean;
  sendThirtyTwoRShort: boolean;
}

export const initialState: State = {
  toteReleaseInterval: 100,
  toteTrackTravelTime: 100,
  maxTotesOnTrack: 7,
  releasing: false,
  includeFMD: true,
  sendThirtyTwoRShort: false
};


export const reducer = createReducer(
  initialState,
  on(updateFMD,  (state, { include }) => ({ ...state, includeFMD: include}))
);

