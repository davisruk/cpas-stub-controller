import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { ToteMessagesService } from '../services/tote-messages.service';
import { selectWebSocketStatus } from './../../dsp-live-stats/store/dsp-live-stats.selectors';
import { loadToteMessages, loadToteMessagesSuccess } from './tote-messages.actions';

@Injectable()
export class ToteMessagesEffects {
  constructor(private actions$: Actions, private msgService: ToteMessagesService, private store: Store<AppState>) { }

  loadToteMessages$ = createEffect(() => this.actions$.pipe(
    ofType(loadToteMessages),
    withLatestFrom(this.store.select(selectWebSocketStatus)),
    mergeMap(([params, socket]) => this.msgService.getToteMessages(params.toteId, socket.host)),
    map(retVal => loadToteMessagesSuccess({ result: retVal }))
  ));
}
