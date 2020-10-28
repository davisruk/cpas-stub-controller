import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Client, Message } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { WebSocketService } from './../services/web-socket.service';
import { updateSocket, updateStats } from './../store/dsp-live-stats.actions';
import { selectTrackStatus, selectWebSocketStatus } from './../store/dsp-live-stats.selectors';
import { TrackStatus } from './../store/track.status';
import { WebSocketStatus } from './../store/web-socket.status';

@Component({
  selector: 'app-dsp-live-stats',
  templateUrl: './dsp-live-stats.component.html',
  styleUrls: ['./dsp-live-stats.component.scss']
})
export class DspLiveStatsComponent implements OnInit, OnDestroy{

  destroyed$ = new Subject();
  topic = '/topic/livestats';
  stompClient: Client;
  trackStatus$: Observable<TrackStatus>;
  socketStatus$: Observable<WebSocketStatus>;

  constructor(private liveStatsService: WebSocketService, private store: Store<AppState>) {
    this.trackStatus$ = this.store.select(selectTrackStatus);
    this.socketStatus$ = this.store.select(selectWebSocketStatus);
   }


  ngOnInit(): void {
    this.liveStatsService.connect().subscribe(result => {
      this.stompClient = this.liveStatsService.getConnection();
      this.store.dispatch(updateSocket({connState: true}));
      this.stompClient.subscribe(this.topic, (sdkEvent: Message) => {
        const message: TrackStatus = JSON.parse(sdkEvent.body);
        this.store.dispatch(updateStats({newStats: message}));
      });
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.liveStatsService.closeConnection();
    this.store.dispatch(updateSocket({connState: false}));
  }
}
