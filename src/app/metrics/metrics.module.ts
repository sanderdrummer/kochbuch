import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricsComponent } from './metrics.component';
import { CategoriesComponent } from './categories/categories.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '@angular/material';
import {MetricsRoutes} from './metrics.routes';

@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    MetricsRoutes,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [MetricsComponent, CategoriesComponent]
})
export class MetricsModule { }
