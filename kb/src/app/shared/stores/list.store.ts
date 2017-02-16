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
  state:any;
  constructor(public parser: ParserService, public af: AngularFire) {
    this.products = [];
    this.lists = [];
    this.selectedProduct = null;
    this.selectedList = null;
    this.selectedFirebase$ = null;
    this.url = '/lists';
    this.listsFirebase$ = this.af.database.object(this.url);
    this.state = {
      loading:false,
      lists: [],
      selectedList: null
    };
    this.state$ = new BehaviorSubject(this.state);
    this.fetchLists();
  }

  fetchLists() {
    this.listsFirebase$.subscribe((listObj) => {
      this.lists = [];
      this.parser.parseFireBaseObjToArray(listObj).forEach((listId) => {
        this.lists.push(new ListModel(listObj[listId]));
      });

      this.state$.next(Object.assign(this.state,{
        lists:this.lists,
        loading:false,
      }));
    });
  }

  addList(title:string){
    const newList = {};
    newList[title] = new ListModel({title});
    return this.listsFirebase$.update(newList);
  }

  selectList(newList: ListModel) {
    this.state$.next(Object.assign(this.state, {selectedList:newList}));
  }

  getFireBaseOfList(list:ListModel) {
    return this.af.database.object('/lists/' + list.title);
  }

  addToCart(list:ListModel, products:any[]) {
    const selectedList$ = this.getFireBaseOfList(list);
    list.forBasket = list.forBasket.concat(products);
    return selectedList$.update(list);
  }

  removeList(list:ListModel){
    const selectedList$ = this.getFireBaseOfList(list);
    selectedList$.remove();
  }

  removeProductFromList(index:number, source:string){
    const selectedList$ = this.getFireBaseOfList(this.state.selectedList);

    if (this.state.selectedList[source]) {
      this.state.selectedList[source].splice(index, 1);
    }

    this.state$.next(Object.assign(this.state, {loading:true}));
    selectedList$.update(this.state.selectedList);
  }

  swapProductBetweenLists(product, index, source, target) {
    const selectedList$ = this.getFireBaseOfList(this.state.selectedList);

    if (this.state.selectedList[source]) {
      this.state.selectedList[source].splice(index, 1);
    }
    if (!this.state.selectedList[target]) {
      this.state.selectedList[target] = [];
    }

    this.state.selectedList[target].push(product);
    this.state$.next(Object.assign(this.state, {loading:true}));
    selectedList$.update(this.state.selectedList);
  }

  clearSelectedList(){
    const selectedList$ = this.getFireBaseOfList(this.state.selectedList);
    this.state.selectedList.forBasket = [];
    this.state.selectedList.inBasket = [];
    this.state$.next(Object.assign(this.state, {loading:true}));
    selectedList$.update(this.state.selectedList);
  }

  setSelectedListByTitle(title:string){
        const selectedList = this.lists.find(list => list.title === title);
        if (selectedList) {
          this.state$.next(Object.assign(this.state, {selectedList}));
        }
  }
}
