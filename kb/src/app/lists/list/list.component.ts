import {Component, OnInit, ElementRef} from '@angular/core';
import {ListStore} from '../../shared/stores/list.store';
import {ActivatedRoute} from '@angular/router';
import {ListModel} from '../../shared/models/list.model';
import {loadavg} from 'os';
import {Observable} from 'rxjs';

@Component({
  selector: 'kb-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  routeSubscribtion;
  storeSubscribtion;
  list: ListModel;
  loading: boolean;
  isVisible: boolean;

  constructor(private route: ActivatedRoute, public store: ListStore) {
    this.isVisible = true;
    this.route.url.subscribe((url) => {
      this.isVisible = true;
      document.body.scrollTop = 0;
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
  }
}
