/**
 * Created by funkp on 27.11.2016.
 */
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from './list/list.component';
import {ProductsComponent} from './products/products.component';
import {ListsComponent} from './lists/lists.component';

export const appRoutes: Routes = [
  { path: '', component: ListsComponent },
  { path: 'list/:id', component: ListComponent },
  { path: 'list/:id/products', component: ProductsComponent },
];

export const appRoutingProviders: any[] = [
];

export const routing = RouterModule.forRoot(appRoutes);
