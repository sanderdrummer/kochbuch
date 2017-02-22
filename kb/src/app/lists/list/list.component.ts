import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {ListStore} from '../../shared/stores/list.store';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {ListModel} from '../../shared/models/list.model';
import {loadavg} from 'os';
import {Observable} from 'rxjs';
import {ProductsStore} from '../../shared/stores/products.store';
import {MdSidenav} from '@angular/material';

@Component({
  selector: 'kb-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild(MdSidenav) sideNav;
  routeSubscribtion;
  storeSubscribtion;
  list: ListModel;
  loading: boolean;
  isVisible: boolean;

  constructor(private router:Router, private route: ActivatedRoute, public store: ListStore) {

    this.routeSubscribtion = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.indexOf('add') > -1 || event.url.indexOf('amount') > -1) {
          this.sideNav.open();
        } else {
          this.sideNav.close();
        }
      }
    });

    this.list = new ListModel({});
    this.storeSubscribtion = store.state$.subscribe((state) => {
      if (state.selectedList) {
        this.list = state.selectedList;
        this.loading = state.loading;
      } else {
        const title = this.route.snapshot.params['title'];
        this.store.setSelectedListByTitle(title);
      }
    });
  }

  toggleIsVisible() {
    this.isVisible = false;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.storeSubscribtion.unsubscribe();
    this.routeSubscribtion.unsubscribe();
  }

  updateRoute(){
    this.router.navigate(['list', this.list.title]);
  }
}
