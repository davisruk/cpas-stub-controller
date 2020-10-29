import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CompatClient, Message, Stomp } from '@stomp/stompjs';
import { Observable, of, Subject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { AppState } from 'src/app/reducers';
import { updateStats } from '../store/dsp-live-stats.actions';
import { TrackStatus } from '../store/track.status';
import { WebSocketStatus } from './../store/web-socket.status';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  constructor(private store: Store<AppState>) { }

  webSocketEndPoint = 'http://localhost:8080/ws';
  stompClient: CompatClient;
  connCount = 0;

  connectSocket(host: string, topic: string): Observable<WebSocketStatus> {
    const ws: WebSocket = new SockJS('http://' + host + ':8080/ws');
    this.stompClient = Stomp.over(ws);
    const connectResult = new Subject<WebSocketStatus>();
    this.stompClient.connect(
      {},
      (_: any) => connectResult.next({ connected: true, host }),
      (_: any) => connectResult.next({ connected: false, host: null })
    );
    return connectResult.asObservable();
  }

  startSubscription(topic: string): void {
    this.stompClient.subscribe(topic, (sdkEvent: Message) => {
      const message: TrackStatus = JSON.parse(sdkEvent.body);
      // don't like this - the service shouldn't know about the store
      // but don't want the connection in the store
      // stomp library really needs better rxjs support
      // could refactor this to pure rxjs WebSocket but
      // the backend uses stomp
      this.store.dispatch(updateStats({ newStats: message }));
    });
  }

  disconnectSocket(): Observable<string> {
    if (this.stompClient) {
      this.stompClient.disconnect(() => { });
    }
    this.connCount = 0;
    return of('Disconnected');
  }

  sendStatusQuery(): void {
    this.stompClient.send('/app/trackStatus', {});
  }
}
