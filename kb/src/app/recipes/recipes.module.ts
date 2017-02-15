import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipeComponent} from './recipe/recipe.component';
import {RecipeCreateComponent} from './recipe-create/recipe-create.component';
import {RecipeProductsToListComponent} from './recipe-products-to-list/recipe-products-to-list.component';
import {RecipeCategoriesComponent} from './recipe-categories/recipe-categories.component';
import {RecipesRouting} from './recipes.routing';
import {RecipesComponent} from './recipes.component';

@NgModule({
  imports: [
    CommonModule,
    RecipesRouting
  ],
  declarations: [RecipesComponent, RecipeComponent, RecipeCreateComponent, RecipeProductsToListComponent, RecipeCategoriesComponent]
})
export class RecipesModule {
}
