import {Injectable} from '@angular/core';
import {ProductModel} from '../models/product.model';
import {ListModel} from '../models/list.model';
import {FirebaseObjectObservable} from 'angularfire2';

@Injectable()
export class ListStore {
  products:ProductModel[];
  lists: ListModel[];
  selectedProduct: ProductModel;
  selectedList: ListModel;
  selectedFirebase$: FirebaseObjectObservable<any>;

  constructor(){
    this.products = [];
    this.lists = [];
    this.selectedProduct = null;
    this.selectedList = null;
    this.selectedFirebase$ = null;
  }
}
