import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { WebSocketService } from '../services/web-socket.service';
import {
  connectLiveStats, connectLiveStatsResult,
  disconnectLiveStats, disconnectLiveStatsSuccess, genericSuccess, sendStatusQuery, startSubscription
} from './dsp-live-stats.actions';

@Injectable()
export class DspLiveStatsEffects {
  constructor(private actions$: Actions, private dspLiveStatsService: WebSocketService) { }

  connectLiveStats$ = createEffect(() => this.actions$.pipe(
    ofType(connectLiveStats),
    switchMap(params => {
      return this.dspLiveStatsService.connectSocket(params.host, params.topic);
    }),
    map(retVal => connectLiveStatsResult({ result: retVal }))
  ));

  disconnectLiveStats$ = createEffect(() => this.actions$.pipe(
    ofType(disconnectLiveStats),
    mergeMap(params => {
      return this.dspLiveStatsService.disconnectSocket();
    }),
    map(retVal => disconnectLiveStatsSuccess())
  ));

  startSubscription$ = createEffect(() => this.actions$.pipe(
    ofType(startSubscription),
    switchMap((params) => {
      this.dspLiveStatsService.startSubscription(params.topic, params.eventHandler);
      return of('done');
    }),
    map(_ => genericSuccess({ source: '[startSubscription$ Effect]' }))
  ));

  sendStatusQuery$ = createEffect(() => this.actions$.pipe(
    ofType(sendStatusQuery),
    switchMap((params) => {
      this.dspLiveStatsService.sendStatusQuery();
      return of('done');
    }),
    map(_ => genericSuccess({ source: '[sendStatusQuery$ Effect]' })
    )));

}
