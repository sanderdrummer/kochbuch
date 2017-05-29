/**
 * Created by funkp on 02.05.2017.
 */

import {Injectable} from '@angular/core';
import {ParserService} from '../../../shared/parser.service';
import {FireBaseCrudService} from '../../../shared/firabase-crud.service';
import {Observable} from 'rxjs/Observable';
import {CategoryModel} from './category.model';

@Injectable()
export class CategoryService {
  baseUrl: string;

  constructor(private parser: ParserService,
              private crud: FireBaseCrudService) {
    this.baseUrl = '/recipe-categories/';
  }

  readCategories(): Observable<CategoryModel[]> {
    return this.crud.read(this.baseUrl).distinctUntilChanged().map(categoryObj => {
      const categories = [];

      this.parser.parseFireBaseObjToArray(categoryObj).forEach((categoryId) => {
        categories.push(new CategoryModel(categoryObj[categoryId]));
      });

      return categories;
    });
  }

  readCategory(title: string): Observable<CategoryModel> {
    const path = this.getPath(title);
    return this.crud.read(path).map(categoryConfig => new CategoryModel(categoryConfig));
  }

  createCategory(title: string): Promise<void> {
    const category = new CategoryModel({title});
    const path = this.getPath(title);
    return this.crud.update(path, category);
  }

  updateCategory(category: CategoryModel): Promise<void> {
    const path = this.getPath(category.title);
    return this.crud.update(path, category);
  }

  deleteCategory(category: CategoryModel): Promise<void> {
    const path = this.getPath(category.title);
    return this.crud.delete(path);
  }

  getPath(key: string): string {
    return this.baseUrl + key;
  }
}
