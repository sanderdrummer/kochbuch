/**
 * Created by Tobias on 15.02.2017.
 */
import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from './lists/list/list.component';
import {RecipesComponent} from './recipes.component';

export const appRoutes: Routes = [
  {path: '', component: RecipesComponent},

];

export const RecipesRouting = RouterModule.forChild(appRoutes);
