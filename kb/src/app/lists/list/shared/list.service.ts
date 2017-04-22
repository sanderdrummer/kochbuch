/**
 * Created by Tobias on 19.04.2017.
 */
import {Injectable} from '@angular/core';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';
import {ListConfig} from '../../../shared/list.config';
import {FireBaseCrudService} from '../../../shared/firabase-crud.service';
import {Observable} from 'rxjs/Observable';
import {ListModel} from './list.model';
@Injectable()
export class ListService {
  baseUrl:string;

  constructor(public af: AngularFire, private crud: FireBaseCrudService) {
    this.baseUrl = ListConfig.url + '/';
  }

  readList(title:string):Observable<ListModel>{
    const path = this.baseUrl + title;
    return this.crud.read(path).map(listConfig => new ListModel(listConfig));
  }

  createList(title:string) {

  }

  updateList() {

  }

  deleteList() {

  }

  getFireBase(path:string):FirebaseObjectObservable<any> {
    const url = this.baseUrl + path;
    return this.af.database.object(url);
  }
}
