import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PinImage } from '../models/pin-image.model';

@Injectable({
  providedIn: 'root',
})
export class PinImageApiService {

  private baseUrl = 'http://localhost:8080/api/images';

  constructor(private http: HttpClient) {}

  getImagesByPin(pinId: number): Observable<PinImage[]> {
    return this.http.get<PinImage[]>(`${this.baseUrl}/pin/${pinId}`);
  }

  deleteImage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
