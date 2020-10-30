import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSliderChange } from '@angular/material/slider';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UploadService } from 'src/app/upload/services/file.upload.service';
import { ChooseFilesDialogComponent } from '../../upload/component/choose-files-dialog.component';
import { State } from '../store/config.reducer';
import { selectWebSocketStatus } from './../../dsp-live-stats/store/dsp-live-stats.selectors';
import { WebSocketStatus } from './../../dsp-live-stats/store/web-socket.status';
import { AppState } from './../../reducers/index';
import { ConfigService } from './../services/config.service';
import {
  loadConfigs, reset, sendConfig, startOSR, stopOSR, update32RShort, updateFMD, updateMaxTotesOnTrack,
  updateReleasing, updateToteRelease, updateToteTravelTime
} from './../store/config.actions';
import { selectConfigFeature } from './../store/config.selectors';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  socketStatus$: Observable<WebSocketStatus>;
  config$: Observable<State>;
  resetting = false;

  constructor(private store: Store<AppState>,
    public dialog: MatDialog,
    public uploadService: UploadService, // service doesn't update the store state
    public configService: ConfigService) {

    this.socketStatus$ = this.store.select(selectWebSocketStatus);
    this.config$ = this.store.select(selectConfigFeature);
  }

  openUploadDialog(): void {
    this.dialog.open(ChooseFilesDialogComponent, {
      width: '30%',
      height: '30%',
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadConfigs());
  }

  onChangeFMD(event: MatSlideToggleChange): void {
    this.store.dispatch(updateFMD({ include: event.checked }));
  }

  onChange32RShort(event: MatSlideToggleChange): void {
    this.store.dispatch(update32RShort({ send32R: event.checked }));
  }

  onChangeToteInterval(event: MatSliderChange): void {
    this.store.dispatch(updateToteRelease({ interval: event.value }));
  }

  onChangeTravelTime(event: MatSliderChange): void {
    this.store.dispatch(updateToteTravelTime({ interval: event.value }));
  }

  onChangeMaxTotes(event: MatSliderChange): void {
    this.store.dispatch(updateMaxTotesOnTrack({ totes: event.value }));
  }

  onChangeReleasing(event: MatSlideToggleChange): void {
    this.store.dispatch(updateReleasing({ isReleasing: event.checked }));
  }

  formatSecondsLabel(value: number): string {
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

  onClickResetRun(): void {
    this.resetting = true;
    this.store.dispatch(reset());
  }
}
