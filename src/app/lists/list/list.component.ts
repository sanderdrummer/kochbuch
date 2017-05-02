import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {ListStore} from '../shared/list.store';
import {ListModel} from '../shared/list.model';
import {ListService} from '../shared/list.service';
import {ProductModel} from '../products/product.model';

@Component({
  selector: 'kb-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  storeSubscription: Subscription;
  list: ListModel;
  loading: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private listService: ListService,
              private listStore: ListStore) {
    this.list = new ListModel({});

    this.storeSubscription = listStore.state$
      .map(state => state.selectedList)
      .distinctUntilChanged()
      .subscribe(state => this.setListByStoreOrRoute(state));
  }

  setListByStoreOrRoute(list): void {
    if (list) {
      this.list = list;
    } else {
      const title = this.route.snapshot.params['title'];
      this.listStore.setSelectedListByTitle(title);
    }
  }


  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }

  updateRoute(): void {
    this.router.navigate(['list', this.list.title]);
  }

  clearBasket(): void {
    this.list.clearBasket();
    this.updateList();
  }

  swapProducts(item: ProductModel, index: number, source: string, target: string): void {
    this.list.swapProducts(item, index, source, target);
    this.updateList();
  }

  addToForBasket(event) {
    const {item, index} = event;
    this.swapProducts(item, index, 'inBasket', 'forBasket');
  }

  addToInBasket(event) {
    const {item, index} = event;
    this.swapProducts(item, index, 'forBasket', 'inBasket');
  }

  removeProduct(index: number): void {
    this.list.removeProductFromBasket(index);
    this.updateList();
  }

  updateList() {
    this.listStore.updateSelectedList(this.list);
    this.listService.updateList(this.list);
  }

}
