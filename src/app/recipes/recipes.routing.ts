/**
 * Created by Tobias on 15.02.2017.
 */
import {RouterModule} from '@angular/router';
import {RecipesComponent} from './recipes.component';
import {RecipeCategoriesComponent} from "./recipe-categories/recipe-categories.component";
import {RecipeComponent} from "./recipe/recipe.component";
import {RecipeCreateComponent} from "./recipe-create/recipe-create.component";
import {RecipeProductsToListComponent} from "./recipe-products-to-list/recipe-products-to-list.component";
import {RecipeCategoriesUpdateComponent} from './recipe-categories/recipe-categories-update/recipe-categories-update.component';
import {RecipesCreateAddProductComponent} from './recipe-create/recipes-create-add-product/recipes-create-add-product.component';

const routes = [
  {path: '', component: RecipesComponent},
  {path: 'categories', component: RecipeCategoriesComponent},
  {path: 'categories/:title', component: RecipeCategoriesUpdateComponent},
  {path: 'create', component: RecipeCreateComponent},
  {path: ':title', component: RecipeComponent},
  {path: ':title/update', component: RecipeCreateComponent},
  {path: ':title/update/products', component: RecipesCreateAddProductComponent},
  {path: ':title/add', component: RecipeProductsToListComponent},
];

export const RecipesRouting = RouterModule.forChild(routes);
