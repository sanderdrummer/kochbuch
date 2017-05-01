import { Component } from '@angular/core';
import {LoginService} from './shared/login/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'kb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(loginService:LoginService, private router:Router){
    loginService.authByLocalStorage().then(
      null,
      () => this.redirectToSettings()
      );
  }

  redirectToSettings() {
    this.router.navigate(['settings']);
  }
}
