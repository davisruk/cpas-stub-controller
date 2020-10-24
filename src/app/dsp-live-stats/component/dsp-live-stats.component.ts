import { selectTrackStatus } from './../store/dsp-live-stats.selectors';
import { updateStats } from './../store/dsp-live-stats.actions';
import { TrackStatus } from './../store/track.status';
import { WebSocketService } from './../services/web-socket.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Observable, Subject } from 'rxjs';
import { Client, Message } from '@stomp/stompjs';

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

  constructor(private liveStatsService: WebSocketService, private store: Store<AppState>) {
    this.trackStatus$ = this.store.select(selectTrackStatus);
   }


  ngOnInit(): void {
    this.liveStatsService.connect().subscribe(result => {
      this.stompClient = this.liveStatsService.getConnection();
      this.stompClient.subscribe(this.topic, (sdkEvent: Message) => {
        const message: TrackStatus = JSON.parse(sdkEvent.body);
        console.log(message);
        this.store.dispatch(updateStats({newStats: message}));
      });
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.liveStatsService.closeConnection();
  }
}
