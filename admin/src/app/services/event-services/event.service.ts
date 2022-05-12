import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_BASE_URL, JWT_TOKEN } from "../constants";
import { Injectable } from "@angular/core";
import { EventType } from "./event-type";

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

  getUpcomingEvent(): Observable<EventType[]> {
    return this.http.get<EventType[]>(
      `${API_BASE_URL}/events/upcoming`,
      httpOptions
    );
  }

  addEvent(event: EventType): Observable<EventType> {
    return this.http.post<EventType>(
      `${API_BASE_URL}/events`,
      event,
      httpOptions
    );
  }

  getEvent(id: number): Observable<EventType> {
    return this.http.get<EventType>(
      `${API_BASE_URL}/events/${id}`,
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
      `${API_BASE_URL}/events`,
      event,
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

  inviteUsers(eventId: number, users: number[]): Observable<any> {
    return this.http.post(
      `${API_BASE_URL}/events/invite?usersId=${users.toString()}&eventId=${eventId}`,
      {},
      {
        headers: new HttpHeaders({
          Authorization: JWT_TOKEN,
        }),
      }
    );
  }

  getInvitedUsers(eventId: number): Observable<any> {
    return this.http.get(
      `${API_BASE_URL}/events/invited-users?eventId=${eventId}`,
      httpOptions
    );
  }

  getAcceptedUsers(eventId: number): Observable<any> {
    return this.http.get(
      `${API_BASE_URL}/events/accepted-users?eventId=${eventId}`,
      httpOptions
    );
  }

  deleteImage(name: string): Observable<any> {
    return this.http.delete(
      `${API_BASE_URL}/events/delete-image/${name}`,
      httpOptions
    );
  }

  uploadImagesToEvent(eventId: number, imgs: File[]): Observable<any> {
    const formData: FormData = new FormData();
    imgs.forEach((img) => formData.append("imgs", img, img.name));
    return this.http.post(
      `${API_BASE_URL}/events/upload-image?eventId=${eventId}`,
      formData,
      {
        headers: new HttpHeaders({
          Authorization: JWT_TOKEN,
        }),
      }
    );
  }
}
