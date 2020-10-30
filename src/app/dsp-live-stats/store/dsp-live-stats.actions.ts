import { createAction, props } from '@ngrx/store';
import { Message } from '@stomp/stompjs';
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
  props<{ topic: string, eventHandler: (event: Message) => void }>()
);

export const genericSuccess = createAction(
  '[DspLiveStats] genericSuccess',
  props<{ source: string }>()
);

export const sendStatusQuery = createAction(
  '[DspLiveStats] sendStatusQuery'
);

export const resetLiveStats = createAction(
  '[DspLiveStats] resetLiveStats'
);

