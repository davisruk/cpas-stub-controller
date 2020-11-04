import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { iif, Observable, of } from 'rxjs';
import { filter, mergeMap, take, tap } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { ToteMessagesDataSource } from '../services/tote-messages.datasource';
import { ToteRawMessage } from '../store/messages.model';
import { sortMessages } from '../store/tote-messages.actions';
import { loadMessage } from './../../view-message/store/view-message.actions';

@Component({
  selector: 'app-tote-messages',
  templateUrl: './tote-messages.component.html',
  styleUrls: ['./tote-messages.component.scss']
})
export class ToteMessagesComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  dataSource: ToteMessagesDataSource;
  noIdColumn$: Observable<string[]> = of(['messageType', 'message', 'creationTime', 'viewMessage']);
  allColumns$: Observable<string[]> = of(['id', 'messageType', 'message', 'creationTime', 'viewMessage']);

  displayedColumns: string[];

  constructor(private store: Store<AppState>, public breakpointObserver: BreakpointObserver) {
    this.allColumns$.pipe(take(1)).subscribe(ret => this.displayedColumns = ret);
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe((sort: Sort) => this.sortData(sort));
  }

  ngOnInit(): void {
    this.dataSource = new ToteMessagesDataSource(this.store);

    // angular material table does not obey fxHide / fxShow so we have to manually
    // listen for media breakpoints and show / hide the columns accordingly
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.HandsetPortrait]).pipe(
      filter(breakpointState => breakpointState.matches),
      mergeMap(breakpointState => iif(
        () => breakpointState.breakpoints[Breakpoints.HandsetPortrait], this.noIdColumn$, this.allColumns$
      )
      ),
      tap(res => this.displayedColumns = res)
    ).subscribe();
  }

  formatMessage(msg: string): string {
    return msg.length > 20 ? msg.substr(0, 20) : msg;
  }

  viewClicked($event, row): void {
    this.store.dispatch(loadMessage({ msgId: row.id }));
  }

  showViewButton(msg: ToteRawMessage): boolean {
    let retVal = false;
    if (msg) {
      retVal = msg.messageType === '12N' || msg.messageType.includes('32R');
    }
    return retVal;
  }

  sortData(sort: Sort): void {
    this.store.dispatch(sortMessages({ sort }));
    console.log('Sort data:' + sort);
  }
}
