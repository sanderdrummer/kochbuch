import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductSelectorComponent} from './product-selector/product-selector.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    ProductSelectorComponent,
    ProductListComponent
  ],
  declarations: [ProductSelectorComponent, ProductListComponent]
})
export class ProductsModule {
}
