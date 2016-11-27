import { Component, OnInit } from '@angular/core';
import {ListsModel} from './lists.model';
import {Router} from '@angular/router';
import {State} from '../shared/app.state.service';
import {ListsService} from '../lists.service';
import {ListModel} from '../list/list.model';

@Component({
  selector: 'kb-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.less']
})
export class ListsComponent implements OnInit {
  loading:boolean;
  listsState:ListsModel;
  constructor(public state:State, public listsService:ListsService, private router:Router) {
  }

  ngOnInit(){
    if (!this.state.lists.length) {
      this.loading = true;
      this.listsService.getLists().toPromise().then((res) => {
        this.updateList(res);
      });
    }
  }

  updateList(lists:ListModel[]) {
    this.state.lists = lists;
    this.loading = false;
  }

  selectList(list) {
    this.state.selectedList = list;
    this.router.navigate(['list', list.id]);
  }

}
