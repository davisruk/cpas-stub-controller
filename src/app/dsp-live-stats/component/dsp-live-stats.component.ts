import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Message } from '@stomp/stompjs';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { connectLiveStats, disconnectLiveStats, sendStatusQuery, updateStats } from '../store/dsp-live-stats.actions';
import { selectReleasing } from './../../config/store/config.selectors';
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
  releasing$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.trackStatus$ = this.store.select(selectTrackStatus);
    this.socketStatus$ = this.store.select(selectWebSocketStatus);
    this.releasing$ = this.store.select(selectReleasing);
    // call subscribe - not connect
    // the connection can be made from 2 places, here and the toolbar
    // subscribeToTopic will wait until the connetion is made
    this.subscribeToTopic();
  }

  subscribeToTopic(): void {
    this.socketStatus$.pipe(
      filter(status => status.connected), // wait until the socket is connected
      take(1), // we only want to send one sub request so finish after this
      tap(_ => {
        // must use => below to access correct 'this' because ... typescript :)
        // if we try to use a member function 'this' will have wrong context -
        // it will refer to the caller i.e. the stomp message handler
        // basically, don't try and move the callback out to its own function
        this.store.dispatch(startSubscription({
          topic: '/topic/livestats', eventHandler: (event: Message): void => {
            const message: TrackStatus = JSON.parse(event.body);
            this.store.dispatch(updateStats({ newStats: message }));
          }
        }));
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
