import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {ListsActions} from './lists.actions';
import {Observable} from 'rxjs';
import {ListsModel} from './lists.model';
import {Router} from '@angular/router';

@Component({
  selector: 'kb-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.less']
})
export class ListsComponent implements OnInit {
  listsState:ListsModel;
  constructor(private store:Store, private router:Router) {
    this.store.dispatch({type: ListsActions.INIT, payload:[]});

    store.select('lists').subscribe(res => {
      this.listsState = res;
    });
  }

  selectList(list) {
    this.store.dispatch({type:ListsActions.SELECT, payload:list});
    this.router.navigate(['list', list.id]);
  }

  ngOnInit() {
  }

}
