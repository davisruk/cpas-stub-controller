import { createAction, props } from '@ngrx/store';
import { TrackStatus } from './track.status';
import { WebSocketStatus } from './web-socket.status';

export const loadDspLiveStatss = createAction(
  '[DspLiveStats] Load DspLiveStats'
);

export const updateStats = createAction(
  '[DspLiveStats] updateStats',
  props<{ newStats: TrackStatus }>()
);

export const connectLiveStats = createAction(
  '[DspLiveStats] connectSocket',
  props<{ host: string; topic: string }>()
);

export const connectLiveStatsResult = createAction(
  '[DspLiveStats] connectSocketResult',
  props<{ result: WebSocketStatus }>()
);

export const disconnectLiveStats = createAction(
  '[DspLiveStats] disconnectSocket'
);

export const disconnectLiveStatsSuccess = createAction(
  '[DspLiveStats] disconnectSocketSuccess'
);

export const startSubscription = createAction(
  '[DspLiveStats] startSubscription',
  props<{ topic: string }>()
);

export const genericSuccess = createAction(
  '[DspLiveStats] startSubscriptionSuccess',
  props<{ source: string }>()
);

export const sendStatusQuery = createAction(
  '[DspLiveStats] sendStatusQuery'
);


