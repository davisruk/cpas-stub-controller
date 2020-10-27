import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { ToteMessagesService } from '../services/tote-messages.service';
import { loadToteMessages, loadToteMessagesSuccess } from './tote-messages.actions';

@Injectable()
export class ToteMessagesEffects {
  constructor(private actions$: Actions, private msgService: ToteMessagesService) {}

  loadToteMessages$ = createEffect(() => this.actions$.pipe(
    ofType(loadToteMessages),
    mergeMap(params => {
      return this.msgService.getToteMessages(params.toteId);
    }),
    map(retVal => loadToteMessagesSuccess({result: retVal}))
  ));
}
