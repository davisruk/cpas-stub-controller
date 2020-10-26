import { Observable, of, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { State } from '../store/config.reducer';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) {}

  public getConfig(): Observable<State> {
    return this.http.get<State>('http://localhost:8080/osr/config');
  }

  public postConfig(config: State): Observable<State> {
    return this.http.post<State>('http://localhost:8080/osr/newConfig', config);
  }

  public postOSR(startState: boolean): Observable<State> {
    return this.http.post<State>('http://localhost:8080/osr/releaseState', {start: startState});
  }

  public postReset(): Observable<string> {
    const success: Subject<string> = new Subject<string>();
    const httpOptions: any = {
      responseType: 'text'
    };

    this.http.post<string>('http://localhost:8080/osr/resetRun', null, httpOptions).pipe(
      tap (data => success.next('Finished'), error => console.log(error))
    ).subscribe();
    return success.asObservable();
  }
}

