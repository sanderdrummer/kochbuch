import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListsComponent} from './lists.component';
import {MaterialModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ProductsModule} from '../products/products.module';
import {ListAddProductComponent} from './list/list-add-product/list-add-product.component';
import {ListComponent} from './list/list.component';
import {ListProductsComponent} from './list/list-products/list-products.component';
@NgModule({
  declarations: [
    ListsComponent,
    ListComponent,
    ListProductsComponent,
    ListAddProductComponent,
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
