import {Component, OnInit, ViewChild} from '@angular/core';
import {MdSidenav} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {ListModel} from './shared/list.model';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ListStore} from '../shared/list.store';
import {ProductModel} from '../products/product.model';
import {ListService} from './shared/list.service';

@Component({
  selector: 'kb-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild(MdSidenav) sideNav;
  routeSubscription: Subscription;
  storeSubscription: Subscription;
  list: ListModel;
  loading: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private listService:ListService,
              private listStore: ListStore) {
    this.list = new ListModel({});

    this.routeSubscription = this.router.events.subscribe(event => this.toggleSideNavOnRouteChange(event));
    this.storeSubscription = listStore.state$
      .map(state => state.selectedList)
      .distinctUntilChanged()
      .subscribe(state => this.setListByStoreOrRoute(state));
  }

  toggleSideNavOnRouteChange(event: any): void {
    if (event instanceof NavigationEnd) {
      const sideBarShouldOpen = event.url.indexOf('add') > -1 || event.url.indexOf('amount') > -1;
      if (sideBarShouldOpen) {
        this.sideNav.open();
      } else {
        this.sideNav.close();
      }
    }
  }

  setListByStoreOrRoute(list): void {
    if (list) {
      this.list = list;
    } else {
      const title = this.route.snapshot.params['title'];
      this.listService.readList(title).first().subscribe((list) => {
        this.list = list;
        this.listStore.updateSelectedList(list);
      });
    }
  }


  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  updateRoute(): void {
    this.router.navigate(['list', this.list.title]);
  }

  clearBasket():void {
    this.list.clearBasket();
    this.updateList();
  }

  swapProducts(item:ProductModel, index:number, source:string, target:string):void {
    this.list.swapProducts(item, index, source, target);
    this.updateList();
  }

  removeProduct(index:number):void{
    console.log(this.list);
    this.list.removeProductFromBasket(index);
    this.updateList();
  }

  updateList() {
    this.listStore.updateSelectedList(this.list);
    this.listService.updateList(this.list);
  }

}
