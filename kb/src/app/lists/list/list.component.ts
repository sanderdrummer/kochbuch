import {Component, OnInit, ViewChild} from '@angular/core';
import {MdSidenav} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {ListModel} from './shared/list.model';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ListStore} from '../shared/list.store';
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
  isVisible: boolean;

  constructor(private router: Router, private route: ActivatedRoute, public store: ListStore) {
    this.list = new ListModel({});

    this.routeSubscription = this.router.events.subscribe(event => this.toggleSideNavOnRouteChange(event));
    this.storeSubscription = store.state$.subscribe(state => this.setListByStoreOrRoute(state));
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

  setListByStoreOrRoute(state): void {
    if (state.selectedList) {
      this.list = state.selectedList;
      this.loading = state.loading;
    } else {
      const title = this.route.snapshot.params['title'];
      this.store.setSelectedListByTitle(title);
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
}
