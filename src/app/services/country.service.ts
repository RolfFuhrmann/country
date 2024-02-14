import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../model/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private readonly countryUrl = 'http://localhost:8081/country';

  constructor(private httpClient: HttpClient) {}

  public getCountries(): Observable<Country> {
    return new Observable<Country>((observer) => {
      const eventSource = new EventSource(this.countryUrl.concat('/countries'));
      eventSource.onmessage = (event) => {
        observer.next(JSON.parse(event.data) as Country);
      };
      eventSource.onerror = (error) => {
        if (eventSource.readyState === 0) {
          console.log('The stream has been closed by the server.');
          eventSource.close();
          observer.complete();
        } else {
          observer.error('EventSource error: ' + JSON.stringify(error));
        }
      };
    });
  }

  public addCountry(country: Country): Observable<Country> {
    return this.httpClient.post<Country>(`${this.countryUrl}/add`, country);
  }

  public deleteCountry(country: Country): Observable<Country> {
    return this.httpClient.delete<Country>(`${this.countryUrl}/delete`, {
      body: country
    });
  }
}
