import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
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
  displayedColumns = ['id', 'messageType', 'message', 'creationTime', 'viewMessage'];

  constructor(private store: Store<AppState>) {
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe((sort: Sort) => this.sortData(sort));
  }

  ngOnInit(): void {
    this.dataSource = new ToteMessagesDataSource(this.store);
  }

  formatMessage(msg: string): string{
    return msg.length > 20 ? msg.substr(0, 20) : msg;
  }

  viewClicked($event, row): void{
    this.store.dispatch(loadMessage({msgId: row.id}));
  }

  showViewButton(msg: ToteRawMessage): boolean{
    let retVal = false;
    if (msg) {
      retVal = msg.messageType === '12N' || msg.messageType.includes('32R');
    }
    return retVal;
  }

  sortData(sort: Sort): void {
    this.store.dispatch(sortMessages({sort}));
    console.log('Sort data:' + sort);
  }
}
