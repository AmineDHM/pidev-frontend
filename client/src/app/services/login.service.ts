import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CredentialsType } from './credentials-type';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(credentials: CredentialsType): Observable<any> {
    return this.http.post(
      'http://localhost:8080/api/auth/signin',{
        username: credentials.username,
        password: credentials.password,
      },
      httpOptions
    );
  }
}
