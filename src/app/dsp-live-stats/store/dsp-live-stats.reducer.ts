import { createReducer, on } from '@ngrx/store';
import { connectLiveStatsResult, disconnectLiveStatsSuccess, genericSuccess, updateStats } from './dsp-live-stats.actions';
import { TrackStatus } from './track.status';
import { WebSocketStatus } from './web-socket.status';

export const dspLiveStatsFeatureKey = 'dspLiveStats';

export interface State {
  webSocketStatus: WebSocketStatus;
  trackStatus: TrackStatus;
}

const initialSocketState: WebSocketStatus = {
  connected: false,
  host: ''
};

const initialtrackStatus: TrackStatus = {
  activeTotes: 0,
  totesProcessed: 0,
  totalTotes: 0,
  sendChannelClient: 'Disconnected',
  receiveChannelClient: 'Disconnected',
  toteNames: ['None']
};

export const initialState: State = {
  webSocketStatus: initialSocketState,
  trackStatus: initialtrackStatus
};

export const reducer = createReducer(
  initialState,
  on(updateStats, (state, { newStats }) => ({ ...state, trackStatus: newStats })),
  on(connectLiveStatsResult, (state, { result }) => ({ ...state, webSocketStatus: result })),
  on(disconnectLiveStatsSuccess, (state) => initialWithoutHostChange(state)),
  on(genericSuccess, (state) => ({ ...state }))
);

function initialWithoutHostChange(state: State): State {
  return { ...initialState, webSocketStatus: { ...initialState.webSocketStatus, host: state.webSocketStatus.host } };
}
