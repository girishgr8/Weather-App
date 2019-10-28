import {Component, OnInit} from '@angular/core';
import {LocationService} from '../shared/services/location.service';
import {MatSnackBar} from '@angular/material';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  WeatherIcon: string;
  City: string;
  DayOrNight: string;
  Icon: string;
  Sunrise: Date;
  Sunset: Date;
  SunriseIcon = '../assets/icons/sunrise.png';
  SunsetIcon = '../assets/icons/sunset.png';
  Latitude: string;
  Longitude: string;
  Speed: string;
  Degree: string;
  Current: string;
  Minimum: string;
  Maximum: string;
  Humidity: string;
  Weather: string;
  constructor(
    private locationService: LocationService,
    private snackBar: MatSnackBar,
    public authService: AuthService
  ) {}

  ngOnInit() {
    document.getElementById('logout-btn').style.display = 'block';
    document.getElementById('login').style.display = 'none';
    document.getElementById('signup').style.display = 'none';
  }

  doNotRefreshPage(event: Event) {
    event.preventDefault();
    return false;
  }
  cityEntered(city: string) {
    console.log('City name is: ' + city);
    this.locationService.getCityWeather(city).subscribe(res => {
      const response = JSON.parse(JSON.stringify(res));
      console.log(response);
      this.City = response.name;
      this.Weather = response.weather[0].main.toUpperCase();
      this.DayOrNight = '../assets/';
      if (response.weather[0].icon.includes('n')) {
        this.DayOrNight += 'night.svg';
      } else {
        this.DayOrNight += 'day.svg';
      }
      document.getElementById(
        'example-header-image'
      ).style.backgroundImage = `"url('http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png')"`;
      this.openSnackBar(
        `${response.name}'s Weather :  ${response.weather[0].main}`,
        'OK'
      );
      this.Sunrise = new Date(response.sys.sunrise * 1000);
      this.Sunset = new Date(response.sys.sunset * 1000);
      this.Longitude = response.coord.lon;
      this.Latitude = response.coord.lat;
      this.Speed = response.wind.speed;
      this.Degree = response.wind.deg;
      this.Current = (response.main.temp - 273.15).toFixed(1).toString();
      this.Minimum = (response.main.temp_min - 273.15).toFixed(1).toString();
      this.Maximum = (response.main.temp_max - 273.15).toFixed(1).toString();
      this.Humidity = response.main.humidity.toString();
      document.getElementById('example-card').style.display = 'block';
    });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 5000});
  }
}
