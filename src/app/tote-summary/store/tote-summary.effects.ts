import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { ToteSummaryService } from './../services/tote-summary.service';
import { loadToteSummarys, loadToteSummarysSuccess } from './tote-summary.actions';



@Injectable()
export class ToteSummaryEffects {
  constructor(private actions$: Actions, private service: ToteSummaryService, private store: Store<AppState>) {}

  loadToteSummarys$ = createEffect(() => this.actions$.pipe(
      ofType(loadToteSummarys),
      mergeMap(params => {
        return this.service.getTotePage(params.pageRequest);
      }
        ),
      map(retVal => loadToteSummarysSuccess({result: retVal}))
    ));
}
