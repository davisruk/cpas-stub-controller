import { createReducer, on } from '@ngrx/store';
import { connectLiveStatsResult, disconnectLiveStatsSuccess, genericSuccess, resetLiveStats, updateStats } from './dsp-live-stats.actions';
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

const initialTrackStatus: TrackStatus = {
  activeTotes: 0,
  totesProcessed: 0,
  totalTotes: 0,
  totesReleased: 0,
  sendChannelClient: 'Unknown',
  receiveChannelClient: 'Unknown',
  toteNames: ['None']
};

export const initialState: State = {
  webSocketStatus: initialSocketState,
  trackStatus: initialTrackStatus
};

export const reducer = createReducer(
  initialState,
  on(updateStats, (state, { newStats }) => reduceUpdateStats(state, newStats)),
  on(connectLiveStatsResult, (state, { result }) => ({ ...state, webSocketStatus: result })),
  on(disconnectLiveStatsSuccess, (state) => initialWithoutHostChange(state)),
  on(genericSuccess, (state) => ({ ...state })),
  on(resetLiveStats, (state) => ({ ...state, trackStatus: initialTrackStatus }))
);

function initialWithoutHostChange(state: State): State {
  return { ...initialState, webSocketStatus: { ...initialState.webSocketStatus, host: state.webSocketStatus.host } };
}

function reduceUpdateStats(oldState: State, newTrackStatus: TrackStatus): State {
  if (!oldState.webSocketStatus.connected) {
    return { ...oldState, trackStatus: initialTrackStatus };
  } else {
    return { ...oldState, trackStatus: newTrackStatus };
  }
}
