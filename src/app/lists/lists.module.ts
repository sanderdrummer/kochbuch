import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListsComponent} from './lists.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {ProductsModule} from '../products/products.module';
import {ListAddProductComponent} from './list/list-add-product/list-add-product.component';
import {ListComponent} from './list/list.component';
import {ListProductsComponent} from './list/list-products/list-products.component';
import {SharedModule} from '../shared/shared.module';
@NgModule({
  declarations: [
    ListsComponent,
    ListComponent,
    ListProductsComponent,
    ListAddProductComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    HttpModule,
    RouterModule,
    ReactiveFormsModule,
    ProductsModule
  ]
})
export class ListsModule {

}
