import { SelectionChange, SelectionModel } from '@angular/cdk/collections';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { fromEvent, iif, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, mergeMap, take, takeUntil, tap } from 'rxjs/operators';
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
export class ToteSummaryComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('input') input: ElementRef;

  unsubscribe$ = new Subject<void>();
  dataSource: ToteSummaryDataSource;
  pageInfo$: Observable<PageResponseDetail>;
  noIdColumn$: Observable<string[]> = of(['toteType', 'orderId', 'sheetNumber', 'containerIdentifier']);
  allColumns$: Observable<string[]> = of(['id', 'toteType', 'orderId', 'sheetNumber', 'containerIdentifier']);
  displayedColumns: string[];

  selection = new SelectionModel<ToteSummary>(false, null);

  constructor(private store: Store<AppState>, public breakpointObserver: BreakpointObserver) {
    this.pageInfo$ = this.store.select(selectPageResponseDetail);
    this.dataSource = new ToteSummaryDataSource(this.store);
    this.allColumns$.pipe(take(1)).subscribe(ret => this.displayedColumns = ret);
  }

  ngAfterViewInit(): void {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        takeUntil(this.unsubscribe$),
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
    // angular material table does not obey fxHide / fxShow so we have to manually
    // listen for media breakpoints and show / hide the columns accordingly
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.HandsetPortrait]).pipe(
      takeUntil(this.unsubscribe$),
      filter(breakpointState => breakpointState.matches),
      mergeMap(breakpointState => iif(
        () => breakpointState.breakpoints[Breakpoints.HandsetPortrait], this.noIdColumn$, this.allColumns$
      )
      ),
      tap(res => this.displayedColumns = res)
    ).subscribe();

    this.selection.changed.subscribe((change: SelectionChange<ToteSummary>) => {
      const selectedTote: ToteSummary = change.added[0];
      if (selectedTote)   // will be undefined if no selection
      {
        this.store.dispatch(loadToteMessages({ toteId: selectedTote.id }));
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
      tap(_ => this.paginator.page.pipe(
        takeUntil(this.unsubscribe$),
        tap(() => this.loadTotesPage())
      ).subscribe()
      )
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
