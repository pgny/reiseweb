import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityApiService {

  private baseUrl = '/api/cities';

  constructor(private http: HttpClient) {}

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.baseUrl);
  }

  getCity(id: number): Observable<City> {
    return this.http.get<City>(`${this.baseUrl}/${id}`);
  }

  createCity(city: City): Observable<City> {
    return this.http.post<City>(this.baseUrl, city);
  }

  updateCity(id: number, city: City): Observable<City> {
    return this.http.put<City>(`${this.baseUrl}/${id}`, city);
  }

  deleteCity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
