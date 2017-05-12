import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipeComponent} from './recipe/recipe.component';
import {RecipeCreateComponent} from './recipe-create/recipe-create.component';
import {RecipeProductsToListComponent} from './recipe-products-to-list/recipe-products-to-list.component';
import {RecipeCategoriesComponent} from './recipe-categories/recipe-categories.component';
import {RecipesRouting} from './recipes.routing';
import {RecipesComponent} from './recipes.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RecipeService} from './shared/recipe.service';
import {RecipeStore} from './shared/recipe.store';
import {
  MaterialModule
} from '@angular/material';
import { RecipeCategoriesUpdateComponent } from './recipe-categories/recipe-categories-update/recipe-categories-update.component';
import {CategoryStore} from './recipe-categories/shared/category.store';
import {BaseCrudService} from '../shared/base-crud.service';
import {CategoryService} from './recipe-categories/shared/category.service';
import {RecipesCreateAddProductComponent} from './recipe-create/recipes-create-add-product/recipes-create-add-product.component';
import {ProductsModule} from '../products/products.module';

@NgModule({
  imports: [
    CommonModule,
    RecipesRouting,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ProductsModule
  ],
  declarations: [
    RecipesComponent,
    RecipeComponent,
    RecipeCreateComponent,
    RecipeProductsToListComponent,
    RecipeCategoriesComponent,
    RecipeCategoriesUpdateComponent,
    RecipesCreateAddProductComponent,
  ],
  providers: [
    RecipeStore,
    RecipeService,
    CategoryStore,
    CategoryService,
    BaseCrudService
  ]
})
export class RecipesModule {
}
