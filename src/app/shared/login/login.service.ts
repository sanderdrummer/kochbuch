import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class LoginService {

  constructor(private af: AngularFireAuth ) {
  }

  authByLocalStorage(): Promise<any> {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    return this.authByParams(email, password);
  }

  saveLogin(email: string, password: string): void {
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
  }

  clearStorage() {
    localStorage.clear();
  }

  authByParams(email: string, password: string): any {
    return this.af.auth.signInWithEmailAndPassword(email, password);
  }
}
