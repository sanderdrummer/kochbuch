/**
 * Created by Tobias on 15.02.2017.
 */
import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from './lists/list/list.component';
import {ListsComponent} from './lists/lists.component';
import {AddProductToListComponent} from './lists/list/add-product-to-list/add-product-to-list.component';
import {AddAmountToProductComponent} from './lists/list/add-amount-to-product/add-amount-to-product.component';
import {ProductSelectorComponent} from './products/product-selector/product-selector.component';

export const appRoutes: Routes = [
  {path: '', component: ListsComponent},
  {path: 'list/:title', component: ListComponent},
  {path: 'list/:title/add', component: ProductSelectorComponent},
  {path: 'recipes', loadChildren: 'app/recipes/recipes.module#RecipesModule'},
  {path: 'settings', loadChildren: 'app/settings/settings.module#SettingsModule'},
  {path: 'metrics', loadChildren: 'app/metrics/metrics.module#MetricsModule'},
];

export const Routing = RouterModule.forRoot(appRoutes);
