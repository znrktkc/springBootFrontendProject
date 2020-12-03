import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
providedIn: 'root',
})
export class LoginService {

    username: any;
    password: any;

  constructor(private http: HttpClient) {}
  login(username: any, password: any): Observable<any> {
   console.log('login method called.');
   // backend have a basic authentication, so i create header object.
   const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        // tslint:disable-next-line:object-literal-key-quotes
        'Authorization': 'Basic ' + btoa(username + ':' + password)
      })
    };

   console.log('login method finished.');
   return this.http
      .get<any>('http://localhost:8081/api/user', httpOptions)
      .pipe(
        map((res) => res),
      );
    }
}
