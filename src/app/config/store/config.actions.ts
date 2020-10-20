import { createAction, props } from '@ngrx/store';

export const loadConfigs = createAction(
  '[Config] Load Configs'
);

export const updateConfig = createAction(
  '[Config] Update'
);

export const updateFMD = createAction(
  'Config] updateFMD',
  props<{ include: boolean }>()
);




