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
    this.baseUrl = '/recipes/'
  }

  readRecipes(): Observable<RecipeModel[]> {
    return this.crud.read(this.baseUrl).distinctUntilChanged().map(listObj => {
      const lists = [];

      this.parser.parseFireBaseObjToArray(listObj).forEach((listId) => {
        lists.push(new RecipeModel(listObj[listId]));
      });

      return lists;
    });
  }

  readRecipe(title: string): Observable<RecipeModel> {
    const path = this.getPath(title);
    return this.crud.read(path).map(listConfig => new RecipeModel(listConfig));
  }

  createRecipe(title: string): firebase.Promise<void> {
    const list = new RecipeModel({title});
    const path = this.getPath(title);
    return this.crud.update(path, list);
  }

  updateRecipe(list: RecipeModel): firebase.Promise<void> {
    const path = this.getPath(list.title);
    return this.crud.update(path, list);
  }

  deleteRecipe(list: RecipeModel): firebase.Promise<void> {
    const path = this.getPath(list.title);
    return this.crud.delete(path);
  }

  getPath(key: string): string {
    return this.baseUrl + key;
  }
}
