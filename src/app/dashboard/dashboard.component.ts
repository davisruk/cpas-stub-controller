import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, last, tap } from 'rxjs/operators';
import { WebSocketStatus } from '../dsp-live-stats/store/web-socket.status';
import { AppState } from '../reducers';
import { connectLiveStats, disconnectLiveStats } from './../dsp-live-stats/store/dsp-live-stats.actions';
import { selectWebSocketStatus } from './../dsp-live-stats/store/dsp-live-stats.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {
  socketStatus$: Observable<WebSocketStatus>;

  constructor(private store: Store<AppState>) {
    this.socketStatus$ = this.store.select(selectWebSocketStatus);
  }
  ngOnDestroy(): void {
    this.socketStatus$.pipe(
      last(),
      filter(status => status.connected),
      tap(_ => this.onDisconnect())
    ).subscribe();
  }

  onConnect(host: string): void {
    this.store.dispatch(connectLiveStats({ host, topic: '/topic/livestats' }));
  }

  onDisconnect(): void {
    this.store.dispatch(disconnectLiveStats());
  }
}
