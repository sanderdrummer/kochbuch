/**
 * Created by Tobias on 19.04.2017.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ListModel} from './list.model';
import {FireBaseCrudService} from '../../shared/firabase-crud.service';
import {ParserService} from '../../shared/parser.service';
import {ListConfig} from '../../shared/list.config';
@Injectable()
export class ListService {
  baseUrl: string;

  constructor(private crud: FireBaseCrudService,
              private parser: ParserService) {
    this.baseUrl = ListConfig.url + '/';
  }

  readLists(): Observable<ListModel[]> {
    return this.crud.read(this.baseUrl).distinctUntilChanged().map(listObj => {
      const lists = [];

      this.parser.parseFireBaseObjToArray(listObj).forEach((listId) => {
        lists.push(new ListModel(listObj[listId]));
      });

      return lists;
    });
  }

  readList(title: string): Observable<ListModel> {
    const path = this.getPath(title);
    return this.crud.read(path).map(listConfig => new ListModel(listConfig));
  }

  createList(title: string): firebase.Promise<void> {
    const list = new ListModel({title});
    const path = this.getPath(title);
    return this.crud.update(path, list);
  }

  updateList(list: ListModel): firebase.Promise<void> {
    const path = this.getPath(list.title);
    return this.crud.update(path, list);
  }

  deleteList(list: ListModel): firebase.Promise<void> {
    const path = this.getPath(list.title);
    return this.crud.delete(path);
  }

  getPath(key: string): string {
    return this.baseUrl + key;
  }
}
