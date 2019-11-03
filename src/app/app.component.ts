import {Component, OnInit} from '@angular/core';
import {AuthService} from '../app/shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {
    if (this.authService.isLoggedIn() === false) {
      document.getElementById('logout-btn').style.display = 'none';
    }
  }
}
