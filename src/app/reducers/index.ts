import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromConfig from '../config/store/config.reducer';


export interface AppState {

  [fromConfig.configFeatureKey]: fromConfig.State;
}

export const reducers: ActionReducerMap<AppState> = {

  [fromConfig.configFeatureKey]: fromConfig.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
