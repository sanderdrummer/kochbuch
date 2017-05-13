import {RecipeModel} from './recipe.model';
import {CategoryModel} from '../recipe-categories/shared/category.model';
import {RecipeFilterModel} from './recipe-filter.model';
/**
 * Created by funkp on 26.02.2017.
 */
export class RecipeState {
  recipes: RecipeModel[];
  filteredRecipes: RecipeModel[];
  selectedRecipe: RecipeModel;
  filter: RecipeFilterModel;

  constructor(config: any) {
    this.recipes = config.recipes || [];
    this.filteredRecipes = config.filteredRecipes || [];
    this.selectedRecipe = config.selectedRecipe || null;
    this.filter = config.filter || new RecipeFilterModel({});
  }
}
