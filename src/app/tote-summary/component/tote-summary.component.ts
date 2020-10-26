import { selectTotePage } from './../store/tote-summary.selectors';
import { ToteSummaryPage } from './../store/tote-summary.model';
import { loadToteSummarys } from './../store/tote-summary.actions';
import { selectLiveStatsFeature, selectTrackStatus } from './../../dsp-live-stats/store/dsp-live-stats.selectors';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { filter, map, skipUntil, take, takeUntil, takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tote-summary',
  templateUrl: './tote-summary.component.html',
  styleUrls: ['./tote-summary.component.scss']
})
export class ToteSummaryComponent implements OnInit {

  page$: Observable<ToteSummaryPage>;

  constructor(private store: Store<AppState>) {
    this.page$ = this.store.select(selectTotePage);
  }

  ngOnInit(): void {
    this.store.select(selectTrackStatus).pipe(
      filter(stats => stats.totalTotes > 0),
      take(1),
      map(stats => this.store.dispatch(loadToteSummarys({pageRequest: {pageNumber: 0, pageSize: 10}})))
      ).subscribe();
  }
}
