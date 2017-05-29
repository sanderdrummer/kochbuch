import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {Routing} from './app.routing';
import {AngularFireModule} from 'angularfire2';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ParserService} from './shared/parser.service';
import {ListStore} from './lists/shared/list.store';
import {FireBaseCrudService} from './shared/firabase-crud.service';
import {ListsModule} from './lists/lists.module';
import {RouterModule} from '@angular/router';
import {ListService} from './lists/shared/list.service';
import {LoginService} from './shared/login/login.service';
import {ProductService} from './products/shared/product.service';
import {ProductStore} from './products/shared/product.store';
import {ProductsModule} from './products/products.module';
import {SharedModule} from './shared/shared.module';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyCzRi2uePH1TPhEZhDVakWnN2H2HVRS-8U',
  authDomain: 'kochbuch-d2626.firebaseapp.com',
  databaseURL: 'https://kochbuch-d2626.firebaseio.com',
  storageBucket: 'kochbuch-d2626.appspot.com',
  messagingSenderId: '916192258488'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    Routing,
    SharedModule,
    RouterModule,
    ListsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
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
