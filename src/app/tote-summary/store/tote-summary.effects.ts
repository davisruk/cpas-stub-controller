import { loadToteSummarys, loadToteSummarysSuccess } from './tote-summary.actions';
import { ToteSummaryService } from './../services/tote-summary.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { map, mergeMap } from 'rxjs/operators';



@Injectable()
export class ToteSummaryEffects {
  constructor(private actions$: Actions, private service: ToteSummaryService, private store: Store<AppState>) {}

  loadToteSummarys$ = createEffect(() => this.actions$.pipe(
      ofType(loadToteSummarys),
      mergeMap(params => {
        console.log('Effect Called');
        return this.service.getTotePage(params.pageRequest);
      }
        ),
      map(retVal => loadToteSummarysSuccess({result: retVal}))
    ));
}
