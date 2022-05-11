import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationType } from './notification-type';
import { API_BASE_URL } from '../constants';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  getAllNotifications(): Observable<NotificationType[]> {
    return this.http.get<NotificationType[]>(
      `${API_BASE_URL}/all-notifications`,
      httpOptions
    );
  }

  markAsSeen(id: number | undefined): Observable<any> {
    return this.http.put(
      `${API_BASE_URL}/mark-read?notificationId=${id}`,
      httpOptions
    );
  }

  getUnseenCount(): Observable<any> {
    return this.http.get(`${API_BASE_URL}/count-unseen`, httpOptions);
  }
}
