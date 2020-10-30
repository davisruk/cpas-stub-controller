import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { ToteMessage } from '../store/view-message.model';
import { selectMessage } from './../store/view-message.selectors';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.scss']
})
export class ViewMessageComponent implements OnInit {
  message$: Observable<ToteMessage>;
  pretty = false;
  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.message$ = this.store.select(selectMessage);
  }

  togglePretty(): void {
    this.pretty = !this.pretty;
  }
}
