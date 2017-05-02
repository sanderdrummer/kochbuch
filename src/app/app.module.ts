import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {Routing} from './app.routing';
import {AuthProviders, AuthMethods, AngularFireModule} from 'angularfire2';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ParserService} from './shared/parser.service';
import {ListStore} from './lists/shared/list.store';
import {FireBaseCrudService} from './shared/firabase-crud.service';
import {ListsModule} from './lists/lists.module';
import {MaterialModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {ListService} from './lists/shared/list.service';
import {LoginService} from './shared/login/login.service';
import {ProductService} from './products/shared/product.service';
import {ProductStore} from './products/shared/product.store';
import {ProductsModule} from './products/products.module';

export const firebaseConfig = {
  apiKey: 'AIzaSyCzRi2uePH1TPhEZhDVakWnN2H2HVRS-8U',
  authDomain: 'kochbuch-d2626.firebaseapp.com',
  databaseURL: 'https://kochbuch-d2626.firebaseio.com',
  storageBucket: 'kochbuch-d2626.appspot.com',
  messagingSenderId: '916192258488'
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    Routing,
    RouterModule,
    ListsModule,
    BrowserAnimationsModule,
    MaterialModule.forRoot(),
    FlexLayoutModule,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    ProductsModule
  ],
  providers: [
    FireBaseCrudService,
    ParserService,
    LoginService,
    ListStore,
    ListService,
    ProductService,
    ProductStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
