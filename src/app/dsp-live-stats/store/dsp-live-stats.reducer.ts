import { TrackStatus } from './track.status';
import { Action, createReducer, on } from '@ngrx/store';


export const dspLiveStatsFeatureKey = 'dspLiveStats';

export interface State {
  trackStatus: TrackStatus;
}

export const initialState: State = {
  trackStatus: {
    activeTotes: 0,
    totesProcessed: 0,
    totalTotes: 0,
    totesOnTrack: 0
  }
};


export const reducer = createReducer(
  initialState,

);

