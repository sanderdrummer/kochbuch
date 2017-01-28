import { Component } from '@angular/core';
import { Platform, MenuController  } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import {ListsPage} from '../pages/lists/lists';
import {AngularFire} from 'angularfire2';
import {AuthService} from '../providers/auth.service';
import {RecipesPage} from '../pages/recipes/recipes';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = RecipesPage;
  listsPage;
  recipesPage;

  title:string;

  constructor(platform: Platform, af: AngularFire, auth:AuthService, public menu:MenuController) {
    this.title = 'Rezepte';
    menu.enable(true);
    this.listsPage = ListsPage;
    this.recipesPage = RecipesPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      af.auth.login({ email: auth.name, password: auth.pw });
    });
  }

  openPage(p, title:string) {
    this.rootPage = p;
    this.menu.close();
    this.title = title;
  }
}
