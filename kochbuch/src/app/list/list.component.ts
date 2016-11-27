import { Component, OnInit } from '@angular/core';
import {State} from '../shared/app.state.service';
import {ListService} from './list.service';
import {Router} from '@angular/router';

@Component({
  selector: 'kb-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  loading:boolean;
  constructor(public state:State, listService:ListService, private router:Router) {
    this.loading = true;
    listService.getListDetails(state.selectedList.id).toPromise().then(res => {
        this.state.selectedList = res;
        this.loading = false;
    });
  }

  ngOnInit() {

  }

  clearList(){

  }

  removeList(){

  }

  addProductsToList(){
    this.router.navigate(['list',this.state.selectedList.id, 'products']);
  }

}
