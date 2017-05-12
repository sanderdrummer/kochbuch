import {RecipeModel} from './recipe.model';
import {CategoryModel} from '../recipe-categories/shared/category.model';
/**
 * Created by funkp on 26.02.2017.
 */
export class RecipeState {
  recipes: RecipeModel[];
  filteredRecipes: RecipeModel[];
  selectedRecipe: RecipeModel;
  filter: any;

  constructor(config: any) {
    this.recipes = config.recipes || [];
    this.filteredRecipes = config.filteredRecipes || [];
    this.selectedRecipe = config.selectedRecipe || null;
    this.filter = config.filter || {};
  }

  filterRecipes() {
    const maxLength = 150;
    let currentLength = 0;
    return this.filteredRecipes = this.recipes.filter((recipe: RecipeModel) => {

      let matchingText = true;
      let matchingCategory = true;
      let matching;

      if (this.filter && this.filter.text) {
        const fuzzyMatching = this.filter.text.split(' ');
        matchingText = fuzzyMatching.every((subText: string) => {
          return recipe.title.toLowerCase().indexOf(subText.toLowerCase()) > -1;
        });
      }

      matching = matchingText && matchingCategory;

      if (matching) {
        currentLength += 1;
      }

      return matching && currentLength < maxLength;
    })
  }
}
