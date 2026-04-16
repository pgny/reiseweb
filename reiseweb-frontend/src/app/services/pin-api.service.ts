import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pin } from '../models/pin.model';

@Injectable({
  providedIn: 'root',
})
export class PinApiService {

  private baseUrl = '/api/pins';

  constructor(private http: HttpClient) {}

  getPins(): Observable<Pin[]> {
    return this.http.get<Pin[]>(this.baseUrl);
  }

  getPin(id: number): Observable<Pin> {
    return this.http.get<Pin>(`${this.baseUrl}/${id}`);
  }

  createPin(pin: Pin): Observable<Pin> {
    return this.http.post<Pin>(this.baseUrl, pin);
  }

  updatePin(id: number, pin: Pin): Observable<Pin> {
    return this.http.put<Pin>(`${this.baseUrl}/${id}`, pin);
  }

  deletePin(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
