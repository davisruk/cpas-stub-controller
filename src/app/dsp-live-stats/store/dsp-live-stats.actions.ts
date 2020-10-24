import { TrackStatus } from './track.status';
import { createAction, props } from '@ngrx/store';

export const loadDspLiveStatss = createAction(
  '[DspLiveStats] Load DspLiveStats'
);

export const updateStats = createAction(
  '[DspLiveStats] updateStats',
  props<{ newStats: TrackStatus }>()
);




