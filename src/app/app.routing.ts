/**
 * Created by Tobias on 15.02.2017.
 */
import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from './lists/list/list.component';
import {ListsComponent} from './lists/lists.component';
import {ListAddProductComponent} from './lists/list/list-add-product/list-add-product.component';

export const appRoutes: Routes = [
  {path: '', component: ListsComponent},
  {path: 'list/:title', component: ListComponent},
  {path: 'list/:title/add', component: ListAddProductComponent},
  {path: 'recipes', loadChildren: 'app/recipes/recipes.module#RecipesModule'},
  {path: 'settings', loadChildren: 'app/settings/settings.module#SettingsModule'},
  {path: 'metrics', loadChildren: 'app/metrics/metrics.module#MetricsModule'},
];

export const Routing = RouterModule.forRoot(appRoutes);
