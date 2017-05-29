import {Injectable} from '@angular/core';
import {Store} from '../../shared/store';
import {ListStateInterface} from './list-state.interface';
import {ListConfig} from '../../shared/list.config';
import {ProductModel} from '../products/product.model';
import {ListService} from './list.service';
import {ListModel} from './list.model';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
@Injectable()
export class ListStore extends Store<ListStateInterface> {
  url: string;
  listsFirebase$: FirebaseObjectObservable<any>;

  constructor(public af: AngularFireDatabase, public listService: ListService) {
    super();
    this.url = ListConfig.url;
    this.listsFirebase$ = this.af.object(this.url);
    this.init({
      lists: [],
      selectedList: null
    });
    this.fetchLists();
  }

  fetchLists() {
    this.listService.readLists().subscribe((lists) => {
      this.update({
        lists: lists,
      });
    });
  }

  updateSelectedList(selectedList: ListModel) {
    this.update({selectedList});
  }

  setSelectedListByTitle(title) {
    const state = this.state$.getValue();
    if (!state.selectedList) {
      this.listService.readList(title)
        .first()
        .subscribe((list: ListModel) => this.updateSelectedList(list));
    }
  }

  addProductToList(product: ProductModel): Promise<void> {
    const state = this.state$.getValue();
    console.log(state);
    state.selectedList.forBasket.push(product);
    this.updateSelectedList(state.selectedList);

    return this.listService.updateList(state.selectedList);
  }

  getFireBaseOfList(list: ListModel) {
    return this.af.object('/lists/' + list.title);
  }

  addToCart(list: ListModel, products: any[]) {
    const selectedList$ = this.getFireBaseOfList(list);
    list.forBasket = list.forBasket.concat(products);
    return selectedList$.update(list);
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

  addProductsTolist(list, products) {
    const list$ = this.getFireBaseOfList(list);
    list.forBasket = products;
    list.inBasket = [];
    return list$.update(list);
  }
}

