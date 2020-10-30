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

  public getToteMessages(toteId: number): Observable<ToteMessageSummary> {
    return this.http.get<ToteMessageSummary>('http://localhost:8080/utils/tote/messages?toteId=' + toteId);
  }

  public getMessage(msgId: number): Observable<ToteMessage> {
    return this.http.get<ToteMessage>('http://localhost:8080/utils/tote/messages/' + msgId);
  }
}
