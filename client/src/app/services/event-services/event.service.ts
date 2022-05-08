import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from '../constants';
import { Injectable } from '@angular/core';
import { EventType } from './event-type';
import { TokenService } from '../auth-services/token.service';

export interface FeedbackType {
  rate: number;
  content: string;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<EventType[]> {
    return this.http.get<EventType[]>(
      `${API_BASE_URL}/events`,
      httpOptions
    );
  }

  getEvent(id: number): Observable<EventType> {
    return this.http.get<EventType>(
      `${API_BASE_URL}/events/${id}`,
      httpOptions
    );
  }

  fetchEventWeather(id: number): Observable<any> {
    return this.http.get(
      `${API_BASE_URL}/events/weather?eventId=${id}`,
      httpOptions
    );
  }

  addEventToFav(id: number): Observable<any> {
    console.log(httpOptions);
    return this.http.get(
      `${API_BASE_URL}/add-event-fav?eventId=${id}`,
      httpOptions
    );
  }

  getUserInfoAboutEvent(id: number): Observable<any> {
    return this.http.get(
      `${API_BASE_URL}/get-user-event?eventId=${id}`,
      httpOptions
    );
  }

  getFeedbacksEvent(id: number): Observable<any> {
    return this.http.get(
      `${API_BASE_URL}/get-event-feedbacks?eventId=${id}`,
      httpOptions
    );
  }

  getFavoriteEvents(id: number): Observable<any> {
    return this.http.get(
      `${API_BASE_URL}/get-events-fav?eventId=${id}`,
      httpOptions
    );
  }

  getAverageRatingEvent(id: number): Observable<any> {
    return this.http.get(
      `${API_BASE_URL}/avg-rating?eventId=${id}`,
      httpOptions
    );
  }

  getInvitedEvents(id: number): Observable<any> {
    return this.http.get(
      `${API_BASE_URL}/get-invited-events`,
      httpOptions
    );
  }

  getAcceptedEvents(id: number): Observable<any> {
    return this.http.get(
      `${API_BASE_URL}/get-accepted-events`,
      httpOptions
    );
  }

  feedbackEvent(id: number, feedback: FeedbackType): Observable<any> {
    return this.http.put(
      `${API_BASE_URL}/feedback-event?eventId=${id}`,
      feedback,
      httpOptions
    );
  }
}
