import {Injectable} from '@angular/core';
import {ParserService} from './parser.service';
import {FireBaseCrudService} from './firabase-crud.service';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class BaseCrudService<T> {

  baseUrl: string;
  type:any;

  constructor(private parser: ParserService,
              private crud: FireBaseCrudService) {
  }

  setType(type:any) {
    this.type = type;
  }

  setBaseUrl(url) {
    this.baseUrl = url;
  }

  readItems(): Observable<T[]> {
    return this.crud.read(this.baseUrl).distinctUntilChanged().map(itemObj => {
      const items = [];

      this.parser.parseFireBaseObjToArray(itemObj).forEach((itemId) => {
        items.push(new this.type(itemObj[itemId]));
        console.log(items);
      });

      return items;
    });
  }

  readItem(title: string): Observable<T> {
    const path = this.getPath(title);
    return this.crud.read(path).map(itemConfig => new this.type(itemConfig));
  }

  createItem(key: string): firebase.Promise<void> {
    const item = new this.type({key});
    const path = this.getPath(key);
    return this.crud.update(path, item);
  }

  updateItem(item: T, key:string): firebase.Promise<void> {
    const path = this.getPath(key);
    return this.crud.update(path, item);
  }

  deleteItem(item: T, key:string): firebase.Promise<void> {
    const path = this.getPath(key);
    return this.crud.delete(path);
  }

  getPath(key: string): string {
    return this.baseUrl + key;
  }
}
