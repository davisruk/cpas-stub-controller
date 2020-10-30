import { createReducer, on } from '@ngrx/store';
import {
  loadConfigSuccess, osrSuccess, resetSuccess, sendConfigSuccess, update32RShort, updateFMD,
  updateMaxTotesOnTrack, updateReleasing, updateToteRelease, updateToteTravelTime
} from './config.actions';


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
  on(loadConfigSuccess, (state, { config }) => ({ ...state, ...config })),
  on(updateReleasing, (state, { isReleasing }) => ({ ...state, releasing: isReleasing })),
  on(updateFMD, (state, { include }) => ({ ...state, includeFMD: include })),
  on(update32RShort, (state, { send32R }) => ({ ...state, sendThirtyTwoRShort: send32R })),
  on(updateToteRelease, (state, { interval }) => ({ ...state, toteReleaseInterval: interval })),
  on(updateToteTravelTime, (state, { interval }) => ({ ...state, toteTrackTravelTime: interval })),
  on(updateMaxTotesOnTrack, (state, { totes }) => ({ ...state, maxTotesOnTrack: totes })),
  on(sendConfigSuccess, (state, { config }) => ({ ...state, ...config })),
  on(osrSuccess, (state, { config }) => ({ ...state, ...config })),
  on(resetSuccess, (state) => initialState),
);

