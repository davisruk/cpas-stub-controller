import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { WebSocketService } from '../services/web-socket.service';
import { connectLiveStats, connectLiveStatsResult, disconnectLiveStats, disconnectLiveStatsSuccess } from './dsp-live-stats.actions';



@Injectable()
export class DspLiveStatsEffects {
  constructor(private actions$: Actions, private dspLiveStatsService: WebSocketService) { }

  connectLiveStats$ = createEffect(() => this.actions$.pipe(
    ofType(connectLiveStats),
    mergeMap(params => {
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

}
