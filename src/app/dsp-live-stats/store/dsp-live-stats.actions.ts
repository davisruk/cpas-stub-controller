import { createAction, props } from '@ngrx/store';
import { TrackStatus } from './track.status';

export const loadDspLiveStatss = createAction(
  '[DspLiveStats] Load DspLiveStats'
);

export const updateStats = createAction(
  '[DspLiveStats] updateStats',
  props<{ newStats: TrackStatus }>()
);

export const updateSocket = createAction(
  '[DspLiveStats] updateSocket',
  props<{ connState: boolean }>()
);



