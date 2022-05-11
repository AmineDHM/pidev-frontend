import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const MCV_API_BASE_URL = 'https://microsoft-computer-vision3.p.rapidapi.com';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-RapidAPI-Host': environment.mcv.RapidAPI_Host,
    'X-RapidAPI-Key': environment.mcv.RapidAPI_Key,
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  describeImage(url: string): Observable<any> {
    return this.http.post(`${MCV_API_BASE_URL}/describe`, { url }, httpOptions);
  }
}
