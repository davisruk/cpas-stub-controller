import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  SERVER_URL = 'http://localhost:8080/utils/uploadMasterData';
  constructor(private http: HttpClient) { }

  public upload(files: Set<File>): Observable<string> {
    const formData: FormData = new FormData();
    const uploadProgress = new Subject<string>();
    files.forEach(file => {
      // create a new multipart-form for every file
      formData.append('files', file, file.name);
    });

    const httpOptions: any = {
      responseType: 'text'
    };
    this.http.post<string>(this.SERVER_URL, formData, httpOptions).pipe(
      tap( // Log the result or error
        data => uploadProgress.next('Finished'),
        error => console.log(error)
      )
    ).subscribe();

    return uploadProgress.asObservable();
  }
}

