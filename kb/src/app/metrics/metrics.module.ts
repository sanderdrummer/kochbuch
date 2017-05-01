import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricsComponent } from './metrics.component';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MetricsComponent, CategoriesComponent]
})
export class MetricsModule { }
