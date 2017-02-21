/**
 * Created by Tobias on 15.02.2017.
 */
import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from './lists/list/list.component';
import {ListsComponent} from './lists/lists.component';
import {ProductsComponent} from './products/products.component';
import {AddProductToListComponent} from './lists/list/add-product-to-list/add-product-to-list.component';
import {AddAmountToProductComponent} from './lists/list/add-amount-to-product/add-amount-to-product.component';

export const appRoutes: Routes = [
  {path: '', component: ListsComponent},
  {path: 'list/:title', component: ListComponent, children: [
    {path: 'add', component: AddProductToListComponent},
    {path: 'amount', component: AddAmountToProductComponent},
  ]},
  {path: 'recipes', loadChildren: 'app/recipes/recipes.module#RecipesModule'}

];

export const Routing = RouterModule.forRoot(appRoutes);
