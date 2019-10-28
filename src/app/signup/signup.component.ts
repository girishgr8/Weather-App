import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(public authService: AuthService, public router: Router) {}
  ngOnInit() {
    if (this.authService.isLoggedIn() === true) {
      this.router.navigate(['dashboard']);
    }
    if (this.authService.isLoggedIn() === false) {
      document.getElementById('logout-btn').style.display = 'none';
    }
  }
}
