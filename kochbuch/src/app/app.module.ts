import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {ListComponent} from './list/list.component';
import {ProductsComponent} from './products/products.component';
import {ListsComponent} from './lists/lists.component';
import {routing} from './app.routing';
import {ListsService} from './lists.service';
import {State} from './shared/app.state.service';
import {ListService} from './list/list.service';
import {ProductService} from './products/product.service';
import { AlertComponent } from './shared/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ProductsComponent,
    ListsComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [ListsService, ListService, ProductService, State],
  bootstrap: [AppComponent]
})
export class AppModule {
}
