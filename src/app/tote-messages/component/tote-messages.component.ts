import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { ToteMessagesDataSource } from '../services/tote-messages.datasource';

@Component({
  selector: 'app-tote-messages',
  templateUrl: './tote-messages.component.html',
  styleUrls: ['./tote-messages.component.scss']
})
export class ToteMessagesComponent implements OnInit {

  dataSource: ToteMessagesDataSource;

  displayedColumns = ['id', 'messageType', 'message', 'creationTime'];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.dataSource = new ToteMessagesDataSource(this.store);
  }

}
