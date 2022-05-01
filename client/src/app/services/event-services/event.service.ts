import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL, JWT_TOKEN } from '../constants';
import { Injectable } from '@angular/core';
import { EventType } from './event-type';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: JWT_TOKEN,
  }),
};

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<EventType[]> {
    return this.http.get<EventType[]>(`${API_BASE_URL}/events`, httpOptions);
  }

  getEvent(event: EventType): Observable<EventType> {
    return this.http.get<EventType>(
      `${API_BASE_URL}/events/${event.id}`,
      httpOptions
    );
  }

}
