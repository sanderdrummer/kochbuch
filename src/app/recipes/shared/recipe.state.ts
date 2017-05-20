import {RecipeModel} from './recipe.model';
import {RecipeFilterModel} from './recipe-filter.model';
import {CategoryState} from '../recipe-categories/shared/category.state';

export class RecipeState {
  recipes: RecipeModel[];
  filteredRecipes: RecipeModel[];
  selectedRecipe: RecipeModel;
  filter: RecipeFilterModel;
  categories: CategoryState;

  constructor(config: any) {
    this.recipes = config.recipes || [];
    this.filteredRecipes = config.filteredRecipes || [];
    this.selectedRecipe = config.selectedRecipe || null;
    this.filter = config.filter || new RecipeFilterModel({});
    this.categories = new CategoryState();
  }
}
