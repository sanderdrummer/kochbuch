import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ListsComponent } from './lists/lists.component';
import { ListComponent } from './lists/list/list.component';
import { ProductsComponent } from './products/products.component';
import { AddProductToListComponent } from './lists/list/add-product-to-list/add-product-to-list.component';
import {Routing} from './app.routing';
import {MaterialModule} from '@angular/material';
import {RecipeStore} from './shared/stores/recipe.store';
import {ProductsStore} from './shared/stores/products.store';
import {ListStore} from './shared/stores/list.store';
import {AuthProviders, AuthMethods, AngularFireModule} from 'angularfire2';
import {ParserService} from './shared/parser.service';
import {AddAmountToProductComponent} from './lists/list/add-amount-to-product/add-amount-to-product.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AuthService} from './shared/auth.service';
// Must export the config

export const firebaseConfig = {
  apiKey: "AIzaSyCzRi2uePH1TPhEZhDVakWnN2H2HVRS-8U",
  authDomain: "kochbuch-d2626.firebaseapp.com",
  databaseURL: "https://kochbuch-d2626.firebaseio.com",
  storageBucket: "kochbuch-d2626.appspot.com",
  messagingSenderId: "916192258488"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    AppComponent,
    ListsComponent,
    ListComponent,
    ProductsComponent,
    AddProductToListComponent,
    AddAmountToProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    Routing,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    MaterialModule.forRoot(),
  ],
  providers: [AuthService, ParserService, ListStore,ProductsStore,RecipeStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
