/**
 * Created by Tobias on 15.02.2017.
 */
import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from './lists/list/list.component';

export const appRoutes: Routes = [
  {path: '', component: ListComponent},
  {path: 'recipes', loadChildren: 'app/recipes/recipes.module#RecipesModule'}

];

export const Routing = RouterModule.forRoot(appRoutes);
