import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListsComponent} from './lists.component';
import {ListComponent} from "app/lists/list/list.component";
import {AddProductToListComponent} from './list/add-product-to-list/add-product-to-list.component';
import {AddAmountToProductComponent} from './list/add-amount-to-product/add-amount-to-product.component';
import {MaterialModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ProductsModule} from '../products/products.module';
import { ListProductsComponent } from './list/list-products/list-products.component';
@NgModule({
  declarations: [
    ListsComponent,
    ListComponent,
    AddProductToListComponent,
    AddAmountToProductComponent,
    ListProductsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpModule,
    RouterModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ProductsModule
  ]
})
export class ListsModule {

}
