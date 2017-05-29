import {Injectable} from '@angular/core';
import {FireBaseCrudService} from '../../shared/firabase-crud.service';
import {Observable} from 'rxjs/Observable';
import {RecipeModel} from './recipe.model';
import {ParserService} from '../../shared/parser.service';

@Injectable()
export class RecipeService {
  baseUrl: string;

  constructor(private parser: ParserService,
              private crud: FireBaseCrudService) {
    this.baseUrl = '/recipes/';
  }

  readRecipes(): Observable<RecipeModel[]> {
    return this.crud.read(this.baseUrl).distinctUntilChanged().map(recipeObj => {
      const recipes = [];

      this.parser.parseFireBaseObjToArray(recipeObj).forEach((recipeId) => {
        recipes.push(new RecipeModel(recipeObj[recipeId]));
      });

      return recipes;
    });
  }

  readRecipe(title: string): Observable<RecipeModel> {
    const path = this.getPath(title);
    return this.crud.read(path).map(recipeConfig => new RecipeModel(recipeConfig));
  }

  createRecipe(title: string): Promise<void> {
    const recipe = new RecipeModel({title});
    const path = this.getPath(title);
    return this.crud.update(path, recipe);
  }

  updateRecipe(recipe: RecipeModel): Promise<void> {
    const path = this.getPath(recipe.title);
    return this.crud.update(path, recipe);
  }

  deleteRecipe(recipe: RecipeModel): Promise<void> {
    const path = this.getPath(recipe.title);
    return this.crud.delete(path);
  }

  getPath(key: string): string {
    return this.baseUrl + key;
  }
}
