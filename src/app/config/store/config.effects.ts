import { selectConfigFeature, selectFMD } from './config.selectors';
import { ConfigService } from './../services/config.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { osrSuccess, sendConfig, sendConfigSuccess, startOSR, stopOSR, loadConfigSuccess, loadConfigs } from './config.actions';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';



@Injectable()
export class ConfigEffects {

  constructor(private actions$: Actions, private configService: ConfigService, private store: Store<AppState>) {}

  loadConfigs$ = createEffect(() => this.actions$.pipe(
    ofType(loadConfigs),
    mergeMap(_ => this.configService.getConfig()),
    map(retVal => loadConfigSuccess({config: retVal}))
  ));

  sendConfig$ = createEffect(() => this.actions$.pipe(
      ofType(sendConfig),
      withLatestFrom(this.store.select(selectConfigFeature)),
      mergeMap(([action, config]) => this.configService.postConfig(config).pipe(
        map(configReturn => sendConfigSuccess({config: configReturn}))
      ))
    )
  );

  startOSR$ = createEffect(() => this.actions$.pipe(
    ofType(startOSR),
    mergeMap(_ => this.configService.postOSR(true)),
    map(retVal => osrSuccess({config: retVal}))
  ));

  stopOSR$ = createEffect(() => this.actions$.pipe(
    ofType(stopOSR),
    mergeMap(_ => this.configService.postOSR(false)),
    map(retVal => osrSuccess({config: retVal}))
  ));
}
