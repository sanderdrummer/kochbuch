import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import {ListsPage} from '../pages/lists/lists';
import {AngularFire} from 'angularfire2';
import {AuthService} from '../providers/auth.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = ListsPage;

  constructor(platform: Platform, af: AngularFire, auth:AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      af.auth.login({ email: auth.name, password: auth.pw });
    });
  }
}
