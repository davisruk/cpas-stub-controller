import { updateFMD } from './../store/config.actions';
import { selectFMD } from './../store/config.selectors';
import { AppState } from './../../reducers/index';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  includeFMD$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.includeFMD$ = this.store.select(selectFMD);
   }

  ngOnInit(): void {
  }

  onChange(event: MatSlideToggleChange): void{
    this.store.dispatch(updateFMD({include: event.checked}));
  }
}
