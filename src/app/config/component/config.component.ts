import { updateFMD, update32RShort, updateToteRelease, updateToteTravelTime, updateMaxTotesOnTrack,
          updateReleasing, sendConfig, startOSR, stopOSR, loadConfigs } from './../store/config.actions';
import { selectFMD, select32RShort, selectToteRelease, selectToteTravelTime, selectMaxTotes,
          selectReleasing } from './../store/config.selectors';
import { AppState } from './../../reducers/index';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  release$: Observable<boolean>;
  includeFMD$: Observable<boolean>;
  send32R$: Observable<boolean>;
  toteRelease$: Observable<number>;
  toteTravelTime$: Observable<number>;
  maxTotes$: Observable<number>;
  releasing: boolean;

  constructor(private store: Store<AppState>) {
    this.release$ = this.store.select(selectReleasing);
    this.includeFMD$ = this.store.select(selectFMD);
    this.send32R$ = this.store.select(select32RShort);
    this.toteRelease$ = this.store.select(selectToteRelease);
    this.toteTravelTime$ = this.store.select(selectToteTravelTime);
    this.maxTotes$ = this.store.select(selectMaxTotes);
   }

  ngOnInit(): void {
    this.release$.subscribe(res => this.releasing = res);
    this.store.dispatch(loadConfigs());
  }

  onChangeFMD(event: MatSlideToggleChange): void{
    this.store.dispatch(updateFMD({include: event.checked}));
  }

  onChange32RShort(event: MatSlideToggleChange): void{
    this.store.dispatch(update32RShort({send32R: event.checked}));
  }

  onChangeToteInterval(event: MatSliderChange): void{
    this.store.dispatch(updateToteRelease({interval: event.value}));
  }

  onChangeTravelTime(event: MatSliderChange): void{
    this.store.dispatch(updateToteTravelTime({interval: event.value}));
  }

  onChangeMaxTotes(event: MatSliderChange): void{
    this.store.dispatch(updateMaxTotesOnTrack({totes: event.value}));
  }

  onChangeReleasing(event: MatSlideToggleChange): void{
    this.store.dispatch(updateReleasing({isReleasing: event.checked}));
  }

  formatSecondsLabel(value: number): string{
    if (value >= 1000) {
      return Math.round(value / 1000) + 's';
    }

    return value + 'ms';
  }

  onClickSendConfig(): void {
    this.store.dispatch(sendConfig());
  }

  onClickOSRStart(): void {
    this.store.dispatch(startOSR());
  }

  onClickOSRStop(): void {
    this.store.dispatch(stopOSR());
  }

}
