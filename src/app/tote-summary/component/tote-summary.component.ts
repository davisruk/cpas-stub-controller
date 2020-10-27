import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { ToteSummaryDataSource } from '../services/tote-summary.datasource';
import { selectTrackStatus } from './../../dsp-live-stats/store/dsp-live-stats.selectors';
import { PageResponseDetail } from './../store/tote-summary.model';
import { selectPageResponseDetail } from './../store/tote-summary.selectors';

@Component({
  selector: 'app-tote-summary',
  templateUrl: './tote-summary.component.html',
  styleUrls: ['./tote-summary.component.scss']
})
export class ToteSummaryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: ToteSummaryDataSource;
  pageInfo$: Observable<PageResponseDetail>;
  displayedColumns = ['id', 'toteType', 'orderId', 'sheetNumber', 'containerIdentifier'];

  constructor(private store: Store<AppState>) {
    this.pageInfo$ = this.store.select(selectPageResponseDetail);
  }

  ngOnInit(): void {
    this.dataSource = new ToteSummaryDataSource(this.store);

    this.store.select(selectTrackStatus).pipe(
      filter(stats => stats.totalTotes > 3),
      take(1),
      map(_ => this.dataSource.loadTotes(1)),
      tap(() => this.paginator.page.pipe(tap(() => this.loadTotesPage())).subscribe()),
    ).subscribe();
  }

  loadTotesPage(): void {
    this.dataSource.loadTotes(
      1,
      '',
      'asc',
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }
}
