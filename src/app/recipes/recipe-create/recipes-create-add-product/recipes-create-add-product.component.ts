import {Component, OnInit, ViewChild} from '@angular/core';
import {RecipeService} from '../../shared/recipe.service';
import {ProductListComponent} from '../../../products/product-list/product-list.component';
import {RecipeModel} from '../../shared/recipe.model';
import {RecipeStore} from '../../shared/recipe.store';

@Component({
  selector: 'kb-recipes-create-add-product',
  templateUrl: './recipes-create-add-product.component.html',
  styleUrls: ['./recipes-create-add-product.component.scss']
})
export class RecipesCreateAddProductComponent implements OnInit {
  @ViewChild(ProductListComponent) productList;
  private recipe: RecipeModel;

  constructor(
    private recipeService: RecipeService,
    private recipeStore:RecipeStore
  ) {
    this.recipeStore.getSelected().subscribe(recipe => this.recipe = recipe);
  }

  ngOnInit() {
  }

  addProductWithAmountToRecipe({selectedProduct}): void {
    if (selectedProduct && this.recipe) {
      this.recipe.products.push(selectedProduct);
      this.recipeService.updateRecipe(this.recipe).then(() => {
        this.productList.reset();
      });
    }

  }
}
