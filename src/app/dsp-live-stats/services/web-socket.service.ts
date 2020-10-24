import {Stomp, CompatClient } from '@stomp/stompjs';
import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  constructor() { }

  webSocketEndPoint = 'http://localhost:8080/ws';
  stompClient: CompatClient;

  connect(): Observable<string> {
    const ws: WebSocket = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const connectResult = new Subject<string>();
    this.stompClient.connect(
      {},
      (_: any) => connectResult.next('[SOCK] Successfully Connected'),
      (_: any) => connectResult.next('[SOCK] Connect Error')
    );
    return connectResult.asObservable();
  }

  getConnection(): CompatClient {
    return this.stompClient;
  }

  closeConnection(): void {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {});
    }
  }
}
