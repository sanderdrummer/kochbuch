import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {apiUrl} from './apiurl';
import {List} from "./list";

@Injectable()
export class ListService {

  constructor(private http:Http) { }

  getLists(){
    return this.http.get(apiUrl + 'list').map((configs) => configs.json());
  }

  getList(id:number) {
    return this.http.get(apiUrl + 'list/single?id=' + id).map((config) => new List(config.json()));
  }

  addList(name:string) {
    return this.http.get(apiUrl + 'list/create?name=' + name).map((config) => config.json());
  }

  removeList(id:number) {
    return this.http.get(apiUrl + 'list/destroy?id=' + id).map((config) => config.json());
  }

  clearList(id:number) {
    return this.http.get(apiUrl + 'list/clear?id=' + id).map((config) => config.json());
  }

  removeItem(id:number) {
    return this.http.get(apiUrl + 'item/destroy?id=' + id).map((config) => config.json());
  }
}
