import { TrackStatus } from './track.status';
import { createReducer, on } from '@ngrx/store';
import { updateStats } from './dsp-live-stats.actions';

export const dspLiveStatsFeatureKey = 'dspLiveStats';

export interface State {
  trackStatus: TrackStatus;
}

export const initialState: State = {
  trackStatus: {
    activeTotes: 0,
    totesProcessed: 0,
    totalTotes: 0,
    sendChannelClient: 'Disconnected',
    receiveChannelClient: 'Disconnected'
  }
};

export const reducer = createReducer(
  initialState,
  on(updateStats,  (state, { newStats }) => ({ ...state, trackStatus: newStats})),
);
