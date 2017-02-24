import { Component } from '@angular/core';
import {AuthService} from './shared/auth.service';
import {AngularFire} from 'angularfire2';

@Component({
  selector: 'kb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(af:AngularFire, auth:AuthService){
    af.auth.login({ email: auth.name, password: auth.pw });
  }
}
