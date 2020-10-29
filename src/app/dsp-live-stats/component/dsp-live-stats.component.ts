import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { WebSocketService } from './../services/web-socket.service';
import { selectTrackStatus, selectWebSocketStatus } from './../store/dsp-live-stats.selectors';
import { TrackStatus } from './../store/track.status';
import { WebSocketStatus } from './../store/web-socket.status';

@Component({
  selector: 'app-dsp-live-stats',
  templateUrl: './dsp-live-stats.component.html',
  styleUrls: ['./dsp-live-stats.component.scss']
})
export class DspLiveStatsComponent {
  trackStatus$: Observable<TrackStatus>;
  socketStatus$: Observable<WebSocketStatus>;

  constructor(private liveStatsService: WebSocketService, private store: Store<AppState>) {
    this.trackStatus$ = this.store.select(selectTrackStatus);
    this.socketStatus$ = this.store.select(selectWebSocketStatus);
  }

}
