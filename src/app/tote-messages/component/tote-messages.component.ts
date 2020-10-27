import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { ToteMessagesDataSource } from '../services/tote-messages.datasource';
import { loadMessage } from './../../view-message/store/view-message.actions';

@Component({
  selector: 'app-tote-messages',
  templateUrl: './tote-messages.component.html',
  styleUrls: ['./tote-messages.component.scss']
})
export class ToteMessagesComponent implements OnInit {

  dataSource: ToteMessagesDataSource;

  displayedColumns = ['id', 'messageType', 'message', 'creationTime', 'viewMessage'];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.dataSource = new ToteMessagesDataSource(this.store);
  }

  formatMessage(msg: string): string{
    return msg.length > 20 ?msg.substr(0, 20) : msg;
  }

  viewClicked($event, row): void{
    this.store.dispatch(loadMessage({msgId: row.id}));
  }
}
