/**
 * Created by Tobias on 27.01.2017.
 */
import {Injectable} from '@angular/core';
import {RecipeModel} from '../models/recipe.model';
import {AngularFire} from 'angularfire2';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'
import {ParserService} from '../parser.service';

@Injectable()
export class RecipeStore {
  recipes: RecipeModel[];
  selectedRecipe: RecipeModel;
  categories: string[];
  recipesLoading: boolean;
  categoriesLoading: boolean;

  constructor(public af: AngularFire, public parser: ParserService) {
    this.recipes = [];
    this.selectedRecipe = null;
    this.categories = [];
    this.resolveCategories().subscribe();
  }

  resolveCategories() {
    return this.af.database.object('/categories').map((category) => {
      this.categories = [];
      this.parser.parseFireBaseObjToArray(category).forEach((category) => {
        this.categories.push(category);
      });
    });
  }

  resolveRecipes() {
    return this.af.database.object('/recipes').map((obj) => {
      this.recipes = [];
      this.parser.parseFireBaseObjToArray(obj).forEach((id) => {
        this.recipes.push(new RecipeModel(obj[id]));
      });
    });
  }
}
