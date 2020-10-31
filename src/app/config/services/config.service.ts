import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { State } from '../store/config.reducer';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  public getConfig(host: string): Observable<State> {
    return this.http.get<State>(`http://${host}:8080/osr/config`);
  }

  public postConfig(config: State, host: string): Observable<State> {
    return this.http.post<State>(`http://${host}:8080/osr/newConfig`, config);
  }

  public postOSR(startState: boolean, host: string): Observable<State> {
    return this.http.post<State>(`http://${host}:8080/osr/releaseState`, { start: startState });
  }

  public postReset(host: string): Observable<string> {
    const success: Subject<string> = new Subject<string>();
    const httpOptions: any = {
      responseType: 'text'
    };

    this.http.post<string>(`http://${host}:8080/osr/resetRun`, null, httpOptions).pipe(
      tap(data => success.next('Finished'), error => console.log(error))
    ).subscribe();
    return success.asObservable();
  }
}

