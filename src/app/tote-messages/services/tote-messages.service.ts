import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToteMessage } from 'src/app/view-message/store/view-message.model';
import { ToteMessageSummary } from '../store/messages.model';

@Injectable({
  providedIn: 'root'
})
export class ToteMessagesService {

  constructor(private http: HttpClient) { }

  public getToteMessages(toteId: number, host: string): Observable<ToteMessageSummary> {
    return this.http.get<ToteMessageSummary>(`http://${host}:8080/utils/tote/messages?toteId=${toteId}`);
  }

  public getMessage(msgId: number, host: string): Observable<ToteMessage> {
    return this.http.get<ToteMessage>(`http://${host}:8080/utils/tote/messages/${msgId}`);
  }
}
