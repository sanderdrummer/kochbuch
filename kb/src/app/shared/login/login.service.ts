import { Injectable } from '@angular/core';
import {AngularFire, FirebaseAuthState} from 'angularfire2';

@Injectable()
export class LoginService {

  constructor(private af:AngularFire) {}

  authByLocalStorage():firebase.Promise<FirebaseAuthState> {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    return this.authByParams(email , password);
  }

  saveLogin(email:string, password:string):void {
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
  }

  clearStorage() {
    localStorage.clear();
  }

  authByParams(email:string, password:string):firebase.Promise<FirebaseAuthState>{
    return this.af.auth.login({ email: email, password: password })
  }




}
