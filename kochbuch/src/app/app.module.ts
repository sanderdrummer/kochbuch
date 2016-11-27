import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { ProductsComponent } from './products/products.component';
import { ListsComponent } from './lists/lists.component';
import {routing} from './app.routing';
import {ListsService} from './lists.service';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ProductsComponent,
    ListsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [ListsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
