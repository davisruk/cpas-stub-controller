import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { selectWebSocketStatus } from './../../dsp-live-stats/store/dsp-live-stats.selectors';
import { ToteSummaryService } from './../services/tote-summary.service';
import { loadToteSummarys, loadToteSummarysSuccess } from './tote-summary.actions';



@Injectable()
export class ToteSummaryEffects {
  constructor(private actions$: Actions, private service: ToteSummaryService, private store: Store<AppState>) { }

  loadToteSummarys$ = createEffect(() => this.actions$.pipe(
    ofType(loadToteSummarys),
    withLatestFrom(this.store.select(selectWebSocketStatus)),
    mergeMap(([params, socket]) => this.service.getTotePage(params.pageRequest, socket.host)),
    map(retVal => loadToteSummarysSuccess({ result: retVal }))
  ));
}
