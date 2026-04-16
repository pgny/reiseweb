import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';
import { map } from 'rxjs';
import { ExternalCountryInfo } from '../models/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountryApiService {

  private baseUrl = '/api/countries';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.baseUrl);
  }

  getCountry(id: number): Observable<Country> {
    return this.http.get<Country>(`${this.baseUrl}/${id}`);
  }

  createCountry(country: Country): Observable<Country> {
    return this.http.post<Country>(this.baseUrl, country);
  }

  updateCountry(id: number, country: Country): Observable<Country> {
    return this.http.put<Country>(`${this.baseUrl}/${id}`, country);
  }

  deleteCountry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  getExternalCountryInfo(code: string): Observable<ExternalCountryInfo> {
    return this.http.get<any[]>(`https://restcountries.com/v3.1/alpha/${code}`).pipe(
      map(data => {
        const c = data[0];
        return {
          name: c.name?.common || '',
          capital: c.capital?.[0] || '',
          region: c.region || '',
          subregion: c.subregion || '',
          population: c.population || 0,
          area: c.area || 0,
          languages: c.languages ? Object.values(c.languages) as string[] : [],
          currencies: c.currencies ? Object.values(c.currencies).map((cur: any) => cur.name) : [],
          timezones: c.timezones || [],
          flagUrl: c.flags?.png || '',
          googleMapsUrl: c.maps?.googleMaps || ''
        };
      })
    );
  }
}
