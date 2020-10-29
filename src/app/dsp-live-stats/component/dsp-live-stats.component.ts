import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
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

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.trackStatus$ = this.store.select(selectTrackStatus);
    this.socketStatus$ = this.store.select(selectWebSocketStatus);
    // call subscribe - not connect
    // the connection can be made from 2 places, here and the toolbar
    // subscribeToTopic will wait until the connetion is made
    this.subscribeToTopic();
  }

  subscribeToTopic(): void {
    this.socketStatus$.pipe(
      filter(status => status.connected), // wait until the socket is connected
      take(1), // we only want to send one sub request so finish after this
      map(_ => {
        this.store.dispatch(startSubscription({ topic: '/topic/livestats' }));
        this.store.dispatch(sendStatusQuery());
      }
      )
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
