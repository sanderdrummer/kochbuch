/**
 * Created by funkp on 27.11.2016.
 */
import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Config} from './shared/config';

@Injectable()
export class ListsService {

    constructor(private http:Http) { }

    getLists(){
      return this.http.get(Config.URL + 'list').map(res => res.json());
    }

}
