import {Injectable} from '@angular/core';
import {AngularFire} from 'angularfire2';
import {Store} from '../../shared/store';
import {ParserService} from '../../shared/parser.service';
import {RecipeState} from './recipe.state';
import {RecipeModel} from './recipe.model';
import {CategoryStore} from '../recipe-categories/shared/category.store';

@Injectable()
export class RecipeStore extends Store<RecipeState> {
  recipesUrl: string;

  constructor(public af: AngularFire,
              public parser: ParserService,
              private categoryStore: CategoryStore) {
    super();
    this.init(new RecipeState({}));
    this.recipesUrl = '/recipes';

    this.resolveRecipes().subscribe();
    this.resolveCategories().subscribe();
  }

  resolveCategories() {
    return this.af.database.object('/categories').map((category) => {
      const categories = [];
      this.parser.parseFireBaseObjToArray(category).forEach((category) => {
        categories.push(category);
      });

      this.updateState({categories});
    });
  }

  resolveRecipes() {
    return this.af.database.object('/recipes').map((obj) => {
      const recipes = [];
      this.parser.parseFireBaseObjToArray(obj).forEach((id) => {
        recipes.push(new RecipeModel(obj[id]));
      });

      this.updateState({recipes});
      this.filterRecipes();
    });
  }

  filterRecipes() {
    const filteredRecipes = this.state.filterRecipes();
    this.updateState({filteredRecipes});
  }

  selectRecipe(selectedRecipe: RecipeModel) {
    this.updateState({selectedRecipe});
  }

  updateState(config) {
    this.state$.next(new RecipeState(Object.assign(this.state, config)));
  }

  setSelectedRecipeByTitle(title: string) {
    const selectedRecipe = this.state.recipes.find(list => list.title === title);
    if (selectedRecipe) {
      this.selectRecipe(selectedRecipe);
    }
  }

  updateRecipe(values) {
    const recipe = new RecipeModel(values);
    const fireBase = this.getFireBaseOfRecipe(recipe);
    return fireBase.update(recipe).then(() => {
      this.selectRecipe(recipe);
    });
  }

  getFireBaseOfRecipe(recipe: RecipeModel) {
    return this.af.database.object(this.recipesUrl + '/' + recipe.title);
  }

  deleteRecipe(recipe: RecipeModel) {
    return this.getFireBaseOfRecipe(recipe).remove();
  }

  updateRecipeFilter(filter) {
    this.update({filter});
    this.filterRecipes();
  }

}
