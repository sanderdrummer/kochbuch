import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {ListsActions} from './lists.actions';

@Component({
  selector: 'kb-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.less']
})
export class ListsComponent implements OnInit {

  constructor(private store:Store) { }

  ngOnInit() {
    this.store.dispatch({type: ListsActions.INIT, payload:[]});
  }

}
