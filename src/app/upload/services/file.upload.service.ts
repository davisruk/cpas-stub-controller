import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  public upload(files: Set<File>, host: string): Observable<string> {
    const formData: FormData = new FormData();
    const uploadProgress = new Subject<string>();
    files.forEach(file => {
      // create a new multipart-form for every file
      formData.append('files', file, file.name);
    });

    const httpOptions: any = {
      responseType: 'text'
    };
    this.http.post<string>(`http://${host}:8080/utils/uploadMasterData`, formData, httpOptions).pipe(
      tap( // Log the result or error
        data => uploadProgress.next('Finished'),
        error => console.log(error)
      )
    ).subscribe();

    return uploadProgress.asObservable();
  }
}

