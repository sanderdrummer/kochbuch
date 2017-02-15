import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ListsComponent } from './lists/lists.component';
import { ListComponent } from './lists/list/list.component';
import { ProductsComponent } from './products/products.component';
import { AddProductToListComponent } from './lists/list/add-product-to-list/add-product-to-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ListsComponent,
    ListComponent,
    ProductsComponent,
    AddProductToListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
