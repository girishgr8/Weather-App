import {Injectable, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  getCityWeather(city: string) {
    return this.httpClient.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=63b81722862ccf4ff2f42cac998be09c`
    );
  }
  constructor(private httpClient: HttpClient) {}
}
