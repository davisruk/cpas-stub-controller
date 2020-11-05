import { createAction, props } from '@ngrx/store';
import { State } from './config.reducer';

export const loadConfigs = createAction(
  '[Config] Load Configs'
);
export const loadConfigSuccess = createAction(
  '[Config] Load Configs Success',
  props<{ config: State }>()
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

export const startOSR = createAction('[Config] startOSR');
export const stopOSR = createAction('[Config] stopOSR');
export const setProcessing = createAction(
  '[Config] setProcessing',
  props<{ val: boolean }>()
);
export const osrSuccess = createAction(
  '[Config] OSR Toggle Success',
  props<{ config: State }>()
);

export const reset = createAction('[Config] Reset');
export const resetSuccess = createAction('[Config] Reset Success');
