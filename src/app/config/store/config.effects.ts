import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { messageViewReset } from 'src/app/view-message/store/view-message.actions';
import { resetLiveStats } from './../../dsp-live-stats/store/dsp-live-stats.actions';
import { selectWebSocketStatus } from './../../dsp-live-stats/store/dsp-live-stats.selectors';
import { resetToteMessages } from './../../tote-messages/store/tote-messages.actions';
import { resetToteSummarys } from './../../tote-summary/store/tote-summary.actions';
import { ConfigService } from './../services/config.service';
import { loadConfigs, loadConfigSuccess, osrSuccess, reset, resetSuccess, sendConfig, sendConfigSuccess, startOSR, stopOSR } from './config.actions';
import { selectConfigFeature } from './config.selectors';



@Injectable()
export class ConfigEffects {

  constructor(private actions$: Actions, private configService: ConfigService, private store: Store<AppState>) { }

  loadConfigs$ = createEffect(() => this.actions$.pipe(
    ofType(loadConfigs),
    withLatestFrom(this.store.select(selectWebSocketStatus)),
    mergeMap(([_, socket]) => this.configService.getConfig(socket.host)),
    map(retVal => loadConfigSuccess({ config: retVal }))
  ));

  sendConfig$ = createEffect(() => this.actions$.pipe(
    ofType(sendConfig),
    withLatestFrom(this.store.select(selectWebSocketStatus), this.store.select(selectConfigFeature)),
    mergeMap(([_, socket, config]) => this.configService.postConfig(config, socket.host)),
    map(configReturn => sendConfigSuccess({ config: configReturn }))
  )
  );

  startOSR$ = createEffect(() => this.actions$.pipe(
    ofType(startOSR),
    withLatestFrom(this.store.select(selectWebSocketStatus)),
    mergeMap(([_, socket]) => this.configService.postOSR(true, socket.host)),
    map(retVal => osrSuccess({ config: retVal }))
  ));

  stopOSR$ = createEffect(() => this.actions$.pipe(
    ofType(stopOSR),
    withLatestFrom(this.store.select(selectWebSocketStatus)),
    mergeMap(([_, socket]) => this.configService.postOSR(false, socket.host)),
    map(retVal => osrSuccess({ config: retVal }))
  ));

  reset$ = createEffect(() => this.actions$.pipe(
    ofType(reset),
    withLatestFrom(this.store.select(selectWebSocketStatus)),
    mergeMap(([_, socket]) => this.configService.postReset(socket.host)),
    tap(_ => this.store.dispatch(resetLiveStats())),
    tap(_ => this.store.dispatch(resetToteMessages())),
    tap(_ => this.store.dispatch(resetToteSummarys())),
    tap(_ => this.store.dispatch(messageViewReset())),
    map(_ => resetSuccess())
  ));


}
