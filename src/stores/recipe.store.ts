/**
 * Created by Tobias on 27.01.2017.
 */
import {Injectable} from '@angular/core';
import {RecipeModel} from '../models/recipe.model';
@Injectable()
export class RecipeStore{
  recipes: RecipeModel[];
  slectedRecipe: RecipeModel;
  categories: string[];
}
