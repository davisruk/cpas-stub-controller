import { PageRequestDetail, ToteSummaryPage } from './../store/tote-summary.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToteSummaryService {

  constructor(private http: HttpClient) { }

  public getTotePage(pageRequest: PageRequestDetail): Observable<ToteSummaryPage> {
    return this.http.get<ToteSummaryPage>('http://localhost:8080/utils/tote/page?pageSize=' + pageRequest.pageSize +
      '&' + 'pageNumber=' + pageRequest.pageNumber);
  }
}
