/**
 * Created by Tobias on 15.02.2017.
 */
import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from './lists/list/list.component';
import {RecipesComponent} from './recipes.component';
import {RecipeCategoriesComponent} from "./recipe-categories/recipe-categories.component";
import {RecipeComponent} from "./recipe/recipe.component";
import {RecipeCreateComponent} from "./recipe-create/recipe-create.component";
import {RecipeProductsToListComponent} from "./recipe-products-to-list/recipe-products-to-list.component";

export const appRoutes = [
    {
        path: '', component: RecipesComponent, children: [
        {path: 'categories', component: RecipeCategoriesComponent}
    ]
    },
    {path: ':title', component: RecipeComponent},
    {path: 'create', component: RecipeCreateComponent},
    {path: ':title/update', component: RecipeCreateComponent},
    {path: ':title/add', component: RecipeProductsToListComponent},

];

export const RecipesRouting = RouterModule.forChild(appRoutes);
