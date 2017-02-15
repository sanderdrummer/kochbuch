import {Injectable} from '@angular/core';
import {ProductModel} from '../models/product.model';
import {ListModel} from '../models/list.model';
import {FirebaseObjectObservable, AngularFire} from 'angularfire2';
import {BehaviorSubject} from 'rxjs';
import {ParserService} from '../parser.service';

@Injectable()
export class ListStore {
  products: ProductModel[];
  lists: ListModel[];
  selectedProduct: ProductModel;
  selectedList: ListModel;
  selectedFirebase$: FirebaseObjectObservable<any>;
  url:string;
  state$: BehaviorSubject<any>;
  listsFirebase$: FirebaseObjectObservable<any>;

  constructor(public parser: ParserService, public af: AngularFire) {
    this.products = [];
    this.lists = [];
    this.selectedProduct = null;
    this.selectedList = null;
    this.selectedFirebase$ = null;
    this.url = '/lists';
    this.listsFirebase$ = this.af.database.object(this.url);
    this.state$ = new BehaviorSubject({});
    this.fetchLists();
  }

  fetchLists() {
    this.listsFirebase$.subscribe((listObj) => {
      this.lists = [];
      this.parser.parseFireBaseObjToArray(listObj).forEach((listId) => {
        this.lists.push(new ListModel(listObj[listId]));
      });
      this.state$.next({lists:this.lists});
    });
  }

  addList(title:string){
    const newList = {};
    newList[title] = new ListModel({title});
    return this.listsFirebase$.update(newList);
  }

  selectList(newList: ListModel) {
    this.selectedList = newList;
  }

  addToCart(list:ListModel, products:any[]) {
    const selectedList$ = this.af.database.object('/lists/' + list.title);
    list.forBasket = list.forBasket.concat(products);
    return selectedList$.update(list);
  }
}
