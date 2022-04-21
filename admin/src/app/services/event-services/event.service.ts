import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_BASE_URL } from "../constants";
import { Injectable } from "@angular/core";
import { EventType } from "./event-type";

const auth =
  "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY1MDUxODM4NSwiZXhwIjoxNjUwNTIxOTg1fQ.dkViK1VD3g86Tz4PTaw4fFn439d5v8YHXUEmgYhonJTImILoFInNjqQAVifU-yrr4buqruuhMvC68i8VI3qWNA";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: auth,
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
          Authorization: auth,
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
}
