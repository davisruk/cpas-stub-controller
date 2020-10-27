import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToteMessageSummary } from '../store/messages.model';

@Injectable({
  providedIn: 'root'
})
export class ToteMessagesService {

  constructor(private http: HttpClient) { }

  public getToteMessages(toteId: number): Observable<ToteMessageSummary> {
    return this.http.get<ToteMessageSummary>('http://localhost:8080/utils/tote/messages?toteId=' + toteId);
  }
}
