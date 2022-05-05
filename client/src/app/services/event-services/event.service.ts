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
@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  JWT_TOKEN = this.tokenService.getUser()?.accessToken;

  httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.JWT_TOKEN}`)
      .set('Content-Type', 'application/json'),
  };

  getAllEvents(): Observable<EventType[]> {
    return this.http.get<EventType[]>(
      `${API_BASE_URL}/events`,
      this.httpOptions
    );
  }

  getEvent(id: number): Observable<EventType> {
    return this.http.get<EventType>(
      `${API_BASE_URL}/events/${id}`,
      this.httpOptions
    );
  }

  fetchEventWeather(id: number): Observable<any> {
    return this.http.get(
      `${API_BASE_URL}/events/weather?eventId=${id}`,
      this.httpOptions
    );
  }

  addEventToFav(id: number): Observable<any> {
    console.log(this.httpOptions);
    return this.http.get(
      `${API_BASE_URL}/add-event-fav?eventId=${id}`,
      this.httpOptions
    );
  }

  getUserInfoAboutEvent(id: number): Observable<any> {
    return this.http.get(
      `${API_BASE_URL}/get-user-event?eventId=${id}`,
      this.httpOptions
    );
  }

  getFeedbacksEvent(id: number): Observable<any> {
    return this.http.get(
      `${API_BASE_URL}/get-event-feedbacks?eventId=${id}`,
      this.httpOptions
    );
  }

  getFavoriteEvents(id: number): Observable<any> {
    return this.http.get(
      `${API_BASE_URL}/get-events-fav?eventId=${id}`,
      this.httpOptions
    );
  }

  getAverageRatingEvent(id: number): Observable<any> {
    return this.http.get(
      `${API_BASE_URL}/avg-rating?eventId=${id}`,
      this.httpOptions
    );
  }

  getInvitedEvents(id: number): Observable<any> {
    return this.http.get(
      `${API_BASE_URL}/get-invited-events`,
      this.httpOptions
    );
  }

  getAcceptedEvents(id: number): Observable<any> {
    return this.http.get(
      `${API_BASE_URL}/get-accepted-events`,
      this.httpOptions
    );
  }

  feedbackEvent(id: number, feedback: FeedbackType): Observable<any> {
    return this.http.put(
      `${API_BASE_URL}/feedback-event?eventId=${id}`,
      feedback,
      this.httpOptions
    );
  }
}
