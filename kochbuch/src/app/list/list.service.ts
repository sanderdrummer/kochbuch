import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Config} from '../shared/config';
/**
 * Created by funkp on 27.11.2016.
 */
@Injectable()
export class ListService{
  constructor(private http:Http){}

  getListDetails(id){
    const params = new URLSearchParams();
    params.set('id',id);
    return this.http.get(Config.URL + 'list/single?', { search: params }).map(res => res.json());
  }

  addList(name:string) {
    return this.http.get(Config.URL + 'list/create?name=' + name).map((config) => config.json());
  }

  removeList(id:number) {
    return this.http.get(Config.URL + 'list/destroy?id=' + id).map((config) => config.json());
  }

  clearList(id:number) {
    return this.http.get(Config.URL + 'list/clear?id=' + id).map((config) => config.json());
  }

  removeItem(id:number) {
    return this.http.get(Config.URL + 'item/destroy?id=' + id).map((config) => config.json());
  }
}
