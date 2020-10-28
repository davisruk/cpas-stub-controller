import { SelectionChange, SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, take, tap } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { loadToteMessages } from 'src/app/tote-messages/store/tote-messages.actions';
import { messageViewReset } from 'src/app/view-message/store/view-message.actions';
import { ToteSummaryDataSource } from '../services/tote-summary.datasource';
import { selectTrackStatus } from './../../dsp-live-stats/store/dsp-live-stats.selectors';
import { PageResponseDetail, ToteSummary } from './../store/tote-summary.model';
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
  selection = new SelectionModel<ToteSummary>(false, null);

  constructor(private store: Store<AppState>) {
    this.pageInfo$ = this.store.select(selectPageResponseDetail);
    this.dataSource = new ToteSummaryDataSource(this.store);
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
    this.selection.changed.subscribe((change: SelectionChange<ToteSummary>) =>
    {
        const selectedTote: ToteSummary = change.added[0];
        if (selectedTote)   // will be undefined if no selection
        {
            this.store.dispatch(loadToteMessages({toteId: selectedTote.id}));
            this.store.dispatch(messageViewReset());
        }
    });

    // there will be no totes until a client has connected to the server
    // wait for the live stats to tell us there are now totes in the buffer
    // there is a problem with this implementation - need to refactor so that
    // the subscription is not reliant on ngInit
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
