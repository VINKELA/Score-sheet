import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
    // HttpClient API get() method => Fetch resources list
    get<T>(url:string): Observable<T> {
      return this.http
        .get<T>(environment.appUrl + url)
        .pipe(retry(1), catchError(this.handleError));
    }
      // HttpClient API get() method => Fetch resource
  getById<T>(id: any, url:string): Observable<T> {
    return this.http
      .get<T>(environment.appUrl + url + id)
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API post() method => Create resource
  create<T>(resource: any, url:string): Observable<T> {
    return this.http
      .post<T>(
        environment.appUrl + url,
        resource,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API put() method => Update resource
  update<T>(id: any, resource: any, url:string): Observable<T> {
    return this.http
      .put<T>(
        environment.appUrl + url + id,
        JSON.stringify(resource),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API delete() method => Delete resource
  delete<T>(id: any, url:string) {
    return this.http
      .delete<T>(environment.appUrl + url + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

    handleError(error: any) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      window.alert(errorMessage);
      return throwError(() => {
        return errorMessage;
      });
    }
}

