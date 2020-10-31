import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { ToteMessagesService } from 'src/app/tote-messages/services/tote-messages.service';
import { selectWebSocketStatus } from './../../dsp-live-stats/store/dsp-live-stats.selectors';
import { loadMessage, loadMessageSuccess } from './view-message.actions';

@Injectable()
export class ViewMessageEffects {
  constructor(private actions$: Actions, private msgService: ToteMessagesService, private store: Store<AppState>) { }

  loadMessage$ = createEffect(() => this.actions$.pipe(
    ofType(loadMessage),
    withLatestFrom(this.store.select(selectWebSocketStatus)),
    mergeMap(([params, socket]) => this.msgService.getMessage(params.msgId, socket.host)),
    map(retVal => loadMessageSuccess({ result: retVal }))
  ));

}
