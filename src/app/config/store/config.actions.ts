import { createAction, props } from '@ngrx/store';
import { State } from './config.reducer';

export const loadConfigs = createAction(
  '[Config] Load Configs'
);

export const updateConfig = createAction(
  '[Config] Update'
);

export const updateReleasing = createAction(
  '[Config] updateReleasing',
  props<{ isReleasing: boolean }>()
);

export const updateFMD = createAction(
  '[Config] updateFMD',
  props<{ include: boolean }>()
);

export const update32RShort = createAction(
  '[Config] update32RShort',
  props<{ send32R: boolean }>()
);

export const updateToteRelease = createAction(
  '[Config] updateToteRelease',
  props<{ interval: number }>()
);

export const updateToteTravelTime = createAction(
  '[Config] updateToteTravelTime',
  props<{ interval: number }>()
);

export const updateMaxTotesOnTrack = createAction(
  '[Config] updateMaxTotesOnTrack',
  props<{ totes: number }>()
);

export const sendConfig = createAction('[Config] sendConfig');

export const sendConfigSuccess = createAction(
  '[Config] sendConfig Success',
  props<{ config: State }>()
);

