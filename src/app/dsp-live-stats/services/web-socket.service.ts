import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CompatClient, Message, Stomp } from '@stomp/stompjs';
import { Observable, of, Subject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { AppState } from 'src/app/reducers';
import { WebSocketStatus } from './../store/web-socket.status';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  constructor(private store: Store<AppState>) { }

  stompClient: CompatClient;

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

  startSubscription(topic: string, eventCallback: (sdkEvent: Message) => void): void {
    this.stompClient.subscribe(topic, (sdkEvent: Message) => eventCallback(sdkEvent));
  }

  disconnectSocket(): Observable<string> {
    if (this.stompClient) {
      this.stompClient.disconnect(() => { });
    }
    return of('Disconnected');
  }

  sendStatusQuery(): void {
    this.stompClient.send('/app/trackStatus', {});
  }
}
