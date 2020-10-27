import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { ToteMessagesService } from 'src/app/tote-messages/services/tote-messages.service';
import { loadMessage, loadMessageSuccess } from './view-message.actions';



@Injectable()
export class ViewMessageEffects {



  constructor(private actions$: Actions, private msgService: ToteMessagesService) {}

  loadMessage$ = createEffect(() => this.actions$.pipe(
    ofType(loadMessage),
    mergeMap(params => {
      return this.msgService.getMessage(params.msgId);
    }),
    map(retVal => loadMessageSuccess({result: retVal}))
  ));

}
