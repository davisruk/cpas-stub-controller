import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { ToteSummaryService } from './../services/tote-summary.service';
import { loadToteSummarys, loadToteSummarysSuccess } from './tote-summary.actions';



@Injectable()
export class ToteSummaryEffects {
  constructor(private actions$: Actions, private service: ToteSummaryService) {}

  loadToteSummarys$ = createEffect(() => this.actions$.pipe(
      ofType(loadToteSummarys),
      mergeMap(params => {
        return this.service.getTotePage(params.pageRequest);
      }
        ),
      map(retVal => loadToteSummarysSuccess({result: retVal}))
    ));
}
