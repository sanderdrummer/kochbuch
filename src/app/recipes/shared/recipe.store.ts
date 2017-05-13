import {Injectable} from '@angular/core';
import {Store} from '../../shared/store';
import {RecipeState} from './recipe.state';
import {RecipeModel} from './recipe.model';
import {RecipeService} from './recipe.service';
import {RecipeFilterModel} from './recipe-filter.model';
import {max} from 'rxjs/operator/max';

@Injectable()
export class RecipeStore extends Store<RecipeState> {

  constructor(private recipeService: RecipeService) {
    super();
    this.init(new RecipeState({}));
    this.resolveRecipes();

  }

  resolveRecipes() {
    this.recipeService.readRecipes().subscribe((recipes) => {
      this.update({recipes});
      this.filterRecipes();
    });
  }

  filterRecipes() {
    const maxLength = 150;
    const state: RecipeState = this.state$.getValue();
    if (state.filter.text) {
      const lowerCaseFilter = state.filter.text.toLowerCase();
      const filteredRecipes = state.recipes
        .filter((recipe: RecipeModel) => {
          return recipe.title.toLowerCase().includes(lowerCaseFilter);
        }).slice(0, maxLength);
      this.update({filteredRecipes});
    } else {
      this.update({filteredRecipes: state.recipes.slice(0, maxLength)});
    }

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

  updateRecipeFilter(filter: RecipeFilterModel) {
    this.update({filter});
    this.filterRecipes();
  }

  getSelected() {
    return this.state$.distinctUntilChanged().map(state => state.selectedRecipe);
  }

}
