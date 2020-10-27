import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, take, tap } from 'rxjs/operators';
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
export class ToteSummaryComponent implements OnInit, AfterViewInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('input') input: ElementRef;


  dataSource: ToteSummaryDataSource;
  pageInfo$: Observable<PageResponseDetail>;
  displayedColumns = ['id', 'toteType', 'orderId', 'sheetNumber', 'containerIdentifier'];

  constructor(private store: Store<AppState>) {
    this.pageInfo$ = this.store.select(selectPageResponseDetail);
  }

  ngAfterViewInit(): void {
      // server-side search
      fromEvent(this.input.nativeElement, 'keyup')
          .pipe(
              debounceTime(150),
              distinctUntilChanged(),
              tap(() => {
                  this.paginator.pageIndex = 0;
                  this.loadTotesPage();
              })
          )
          .subscribe();
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
      this.input.nativeElement.value,
      'asc',
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }
}
