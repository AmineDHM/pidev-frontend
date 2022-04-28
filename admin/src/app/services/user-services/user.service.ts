import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../constants';
import { JWT_TOKEN } from '../jwt-token';
import { UserType } from './user-type';


const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: JWT_TOKEN,
  }),
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserType[]> {
    return this.http.get<UserType[]>(`${API_BASE_URL}/userCrud/admin/employees`, httpOptions);
  }

}
