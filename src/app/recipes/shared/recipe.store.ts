import {Injectable} from '@angular/core';
import {Store} from '../../shared/store';
import {RecipeState} from './recipe.state';
import {RecipeModel} from './recipe.model';
import {RecipeService} from './recipe.service';

@Injectable()
export class RecipeStore extends Store<RecipeState> {

  constructor(private recipeService: RecipeService) {
    super();
    this.init(new RecipeState({}));
    this.resolveRecipes();

  }

  resolveRecipes() {
    this.recipeService.readRecipes().subscribe((recipes) => {
      this.update({recipes, filteredRecipes: recipes});
    });
  }

  filterRecipes() {
    const filteredRecipes = this.state.filterRecipes();
    this.update({filteredRecipes});
  }

  selectRecipe(selectedRecipe: RecipeModel) {
    this.update({selectedRecipe});
  }

  setSelectedRecipeByTitle(title: string) {
    const selectedRecipe = this.state.recipes.find(list => list.title === title);
    if (selectedRecipe) {
      this.selectRecipe(selectedRecipe);
    }
  }

  updateRecipeFilter(filter) {
    this.update({filter});
    this.filterRecipes();
  }

  getSelected() {
    return this.state$.distinctUntilChanged().map(state => state.selectedRecipe);
  }

}
