import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSliderChange } from '@angular/material/slider';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, last, takeUntil, tap } from 'rxjs/operators';
import { connectLiveStats, disconnectLiveStats } from 'src/app/dsp-live-stats/store/dsp-live-stats.actions';
import { UploadService } from 'src/app/upload/services/file.upload.service';
import { ChooseFilesDialogComponent } from '../../upload/component/choose-files-dialog.component';
import { State } from '../store/config.reducer';
import { selectTrackStatus, selectWebSocketStatus } from './../../dsp-live-stats/store/dsp-live-stats.selectors';
import { TrackStatus } from './../../dsp-live-stats/store/track.status';
import { WebSocketStatus } from './../../dsp-live-stats/store/web-socket.status';
import { AppState } from './../../reducers/index';
import { ConfigService } from './../services/config.service';
import {
  loadConfigs, reset, sendConfig, setProcessing, startOSR, stopOSR, update32RShort, updateFMD, updateMaxTotesOnTrack,
  updateReleasing, updateToteRelease, updateToteTravelTime
} from './../store/config.actions';
import { selectConfigFeature } from './../store/config.selectors';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit, OnDestroy {

  socketStatus$: Observable<WebSocketStatus>;
  config$: Observable<State>;
  liveStats$: Observable<TrackStatus>;
  unsubscribe$ = new Subject<void>();

  constructor(private store: Store<AppState>,
    public dialog: MatDialog,
    public uploadService: UploadService, // service doesn't update the store state
    public configService: ConfigService) {

    this.socketStatus$ = this.store.select(selectWebSocketStatus);
    this.config$ = this.store.select(selectConfigFeature);
    this.liveStats$ = this.store.select(selectTrackStatus);
  }
  ngOnInit(): void {
    this.store.dispatch(loadConfigs());
    this.liveStats$.pipe(
      takeUntil(this.unsubscribe$),
      filter(stats => stats.totalTotes > 0),
      tap(_ => this.store.dispatch(setProcessing({ val: true })))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.onDisconnect();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openUploadDialog(): void {
    this.dialog.open(ChooseFilesDialogComponent, {
      width: '30%',
      height: '30%',
    });
  }

  onConnect(host: string): void {
    this.onDisconnect();
    this.store.dispatch(connectLiveStats({ host, topic: '/topic/livestats' }));
  }

  onDisconnect(): void {
    this.socketStatus$.pipe(
      last(),
      filter(status => status.connected),
      tap(_ => this.store.dispatch(disconnectLiveStats()))
    ).subscribe();
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
    this.store.dispatch(reset());
  }
}
