import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from './user';
import * as firebase from 'firebase/app';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }
  // Email and Password Login....
  LogInWithEmailAndPassword(email, password) {
    console.log(email, password);
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.setUserData(res.user);
      })
      .catch(err => {
        window.alert(err.message);
      });
  }

  // Email and Password SignUp....
  SignUpWithEmailAndPassword(email, password) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.router.navigate(['dashboard']);
        this.setUserData(res.user);
      })
      .catch(err => {
        window.alert(err.message);
      });
  }

  isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // creating firebase google authentication using google auth service provider...
  GoogleLogin() {
    if (this.isLoggedIn() === true) {
      window.alert('You are already Logged In');
      this.router.navigate(['dashboard']);
      return;
    }
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return this.afAuth.auth.signInWithPopup(provider).then(res => {
      if (res) {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.setUserData(res.user);
      } else {
        window.alert('Login Failed');
      }
    });
  }

  // Adding Authentication data in firebase storage...
  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  GoogleLogout() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
