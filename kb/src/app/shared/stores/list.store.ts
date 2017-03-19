import {Injectable} from '@angular/core';
import {ProductModel} from '../models/product.model';
import {ListModel} from '../models/list.model';
import {FirebaseObjectObservable, AngularFire} from 'angularfire2';
import {ParserService} from '../parser.service';
import {ListStateInterface} from './list-state.interface';
import {Store} from "./store";

@Injectable()
export class ListStore extends Store<ListStateInterface> {
  url: string;
  listsFirebase$: FirebaseObjectObservable<any>;

  constructor(public parser: ParserService, public af: AngularFire) {
    super();
    this.url = '/lists';
    this.listsFirebase$ = this.af.database.object(this.url);
    this.init({
      loading: false,
      lists: [],
      selectedList: null
    });
    this.fetchLists();
  }

  fetchLists() {
    this.listsFirebase$.subscribe((listObj) => {
      const lists = [];
      this.parser.parseFireBaseObjToArray(listObj).forEach((listId) => {
        lists.push(new ListModel(listObj[listId]));
      });

      this.update({
        lists: lists,
        loading: false,
      });
    });
  }

  addList(title: string) {
    const newList = {};
    newList[title] = new ListModel({title});
    return this.listsFirebase$.update(newList);
  }

  selectList(newList: ListModel) {
    this.update({selectedList: newList});
  }

  getFireBaseOfList(list: ListModel) {
    return this.af.database.object('/lists/' + list.title);
  }

  addToCart(list: ListModel, products: any[]) {
    const selectedList$ = this.getFireBaseOfList(list);
    list.forBasket = list.forBasket.concat(products);
    return selectedList$.update(list);
  }

  addProductWithAmountToList(amount: string, product: ProductModel) {
    const selectedList$ = this.getFireBaseOfList(this.state.selectedList);

    product.amount = amount;
    this.state.selectedList.forBasket.push(product);

    return selectedList$.update(this.state.selectedList);
  }

  removeList(list: ListModel) {
    const selectedList$ = this.getFireBaseOfList(list);
    selectedList$.remove();
  }

  removeProductFromList(index: number, source: string) {
    const selectedList$ = this.getFireBaseOfList(this.state.selectedList);

    if (this.state.selectedList[source]) {
      this.state.selectedList[source].splice(index, 1);
    }
    this.update({loading: true});
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
    this.update({loading: true});
    selectedList$.update(this.state.selectedList);
  }

  clearSelectedList() {
    const selectedList$ = this.getFireBaseOfList(this.state.selectedList);
    this.state.selectedList.forBasket = [];
    this.state.selectedList.inBasket = [];
    this.update({loading: true});
    selectedList$.update(this.state.selectedList);
  }

  setSelectedListByTitle(title: string) {
    const selectedList = this.state.lists.find(list => list.title === title);
    if (selectedList) {
      this.update({selectedList});
    }
  }

  addProductsTolist(list, products) {
    const list$ = this.getFireBaseOfList(list);
    list.forBasket = products;
    list.inBasket = [];
    return list$.update(list);
  }
}

