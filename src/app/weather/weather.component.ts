import {Component, OnInit} from '@angular/core';
import {LocationService} from '../location.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  constructor(private locationService: LocationService) {}

  ngOnInit() {}
}
