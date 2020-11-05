import { createReducer, on } from '@ngrx/store';
import {
  loadConfigSuccess, osrSuccess, resetSuccess, sendConfigSuccess, setProcessing, update32RShort, updateFMD,
  updateMaxTotesOnTrack, updateReleasing, updateToteRelease, updateToteTravelTime
} from './config.actions';


export const configFeatureKey = 'config';

export interface State {
  changed: boolean;
  toteReleaseInterval: number;
  toteTrackTravelTime: number;
  maxTotesOnTrack: number;
  releasing: boolean;
  includeFMD: boolean;
  sendThirtyTwoRShort: boolean;
  processingStarted: boolean;
}

export const initialState: State = {
  changed: false,
  processingStarted: false,
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
  on(updateReleasing, (state, { isReleasing }) => ({ ...state, releasing: isReleasing, changed: true })),
  on(updateFMD, (state, { include }) => ({ ...state, includeFMD: include, changed: true })),
  on(update32RShort, (state, { send32R }) => ({ ...state, sendThirtyTwoRShort: send32R, changed: true })),
  on(updateToteRelease, (state, { interval }) => ({ ...state, toteReleaseInterval: interval, changed: true })),
  on(updateToteTravelTime, (state, { interval }) => ({ ...state, toteTrackTravelTime: interval, changed: true })),
  on(updateMaxTotesOnTrack, (state, { totes }) => ({ ...state, maxTotesOnTrack: totes, changed: true })),
  on(sendConfigSuccess, (state, { config }) => ({ ...state, ...config, changed: false })),
  on(osrSuccess, (state, { config }) => ({ ...state, ...config })),
  on(resetSuccess, () => initialState),
  on(setProcessing, (state, { val }) => ({ ...state, processingStarted: val })),
);

