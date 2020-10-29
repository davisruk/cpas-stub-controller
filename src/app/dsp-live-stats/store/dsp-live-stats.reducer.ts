import { createReducer, on } from '@ngrx/store';
import { connectLiveStatsResult, disconnectLiveStatsSuccess, updateStats } from './dsp-live-stats.actions';
import { TrackStatus } from './track.status';
import { WebSocketStatus } from './web-socket.status';

export const dspLiveStatsFeatureKey = 'dspLiveStats';

export interface State {
  webSocketStatus: WebSocketStatus;
  trackStatus: TrackStatus;
}

export const initialState: State = {
  webSocketStatus: {
    connected: false,
    host: ''
  },
  trackStatus: {
    activeTotes: 0,
    totesProcessed: 0,
    totalTotes: 0,
    sendChannelClient: 'Disconnected',
    receiveChannelClient: 'Disconnected',
    toteNames: ['None']
  }
};

export const reducer = createReducer(
  initialState,
  on(updateStats, (state, { newStats }) => ({ ...state, trackStatus: newStats })),
  on(connectLiveStatsResult, (state, { result }) => ({ ...state, webSocketStatus: result })),
  on(disconnectLiveStatsSuccess, (state) => initialState)
);
