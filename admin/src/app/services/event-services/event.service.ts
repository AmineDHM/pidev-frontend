import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_BASE_URL } from "../constants";
import { Injectable } from "@angular/core";
import { EventType } from "./event-type";
import { JWT_TOKEN } from "../jwt-token";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: JWT_TOKEN,
  }),
};

@Injectable({
  providedIn: "root",
})
export class EventService {
  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<EventType[]> {
    return this.http.get<EventType[]>(`${API_BASE_URL}/events`, httpOptions);
  }

  addEvent(event: EventType): Observable<EventType> {
    console.log(event);
    return this.http.post<EventType>(
      `${API_BASE_URL}/events`,
      event,
      httpOptions
    );
  }

  getEvent(event: EventType): Observable<EventType> {
    return this.http.get<EventType>(
      `${API_BASE_URL}/events/${event.id}`,
      httpOptions
    );
  }

  deleteEvent(event: EventType): Observable<EventType> {
    return this.http.delete<EventType>(
      `${API_BASE_URL}/events/${event.id}`,
      httpOptions
    );
  }

  updateEvent(event: EventType): Observable<EventType> {
    return this.http.put<EventType>(
      `${API_BASE_URL}/events/${event.id}`,
      httpOptions
    );
  }

  uploadEventBanner(banner: File, event: EventType): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append("img", banner, banner.name);
    return this.http.put<boolean>(
      `${API_BASE_URL}/events/upload-banner?eventId=${event.id}`,
      formData,
      {
        headers: new HttpHeaders({
          Authorization: JWT_TOKEN,
        }),
      }
    );
  }

  uploadEventImages(event: EventType): Observable<EventType> {
    return this.http.post<EventType>(
      `${API_BASE_URL}/events/upload-image?eventId=${event.id}`,
      httpOptions
    );
  }

  inviteUsers(event: EventType, users: number[]): Observable<any> {
    return this.http.post(
      `${API_BASE_URL}/events/invite?usersId=${users.toString()}&eventId=${event.id}`,
      httpOptions
    );
  }
}
