import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {
    if (this.authService.isLoggedIn() === true) {
      this.router.navigate(['dashboard']);
    }
    if (this.authService.isLoggedIn() === false) {
      document.getElementById('logout-btn').style.display = 'none';
    }
  }

  goToSignUpPage() {
    this.router.navigate(['signup']);
    return;
  }
}
