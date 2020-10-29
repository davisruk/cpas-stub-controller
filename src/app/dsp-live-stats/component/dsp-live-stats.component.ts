import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, map, take, takeUntil, tap } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { connectLiveStats, disconnectLiveStats, sendStatusQuery } from '../store/dsp-live-stats.actions';
import { startSubscription } from './../store/dsp-live-stats.actions';
import { selectTrackStatus, selectWebSocketStatus } from './../store/dsp-live-stats.selectors';
import { TrackStatus } from './../store/track.status';
import { WebSocketStatus } from './../store/web-socket.status';

@Component({
  selector: 'app-dsp-live-stats',
  templateUrl: './dsp-live-stats.component.html',
  styleUrls: ['./dsp-live-stats.component.scss']
})
export class DspLiveStatsComponent implements OnInit {
  trackStatus$: Observable<TrackStatus>;
  socketStatus$: Observable<WebSocketStatus>;
  connectInitEnded$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.trackStatus$ = this.store.select(selectTrackStatus);
    this.socketStatus$ = this.store.select(selectWebSocketStatus);
    this.subscribeToTopic();
  }

  subscribeToTopic(): void {
    this.socketStatus$.pipe(
      filter(status => status.connected), // if connected
      map(_ => {
        this.store.dispatch(startSubscription({ topic: '/topic/livestats' }));
        this.connectInitEnded$.next(true);
        this.store.dispatch(sendStatusQuery());
      }
      ),
      takeUntil(this.connectInitEnded$)
    ).subscribe();
  }

  onConnect(): void {
    this.socketStatus$.pipe(
      take(1),
      tap(status => this.store.dispatch(connectLiveStats({ host: status.host, topic: '/topic/livestats' }))),
      tap(_ => this.subscribeToTopic())
    ).subscribe();
  }

  onDisconnect(): void {
    this.store.dispatch(disconnectLiveStats());
  }
}
