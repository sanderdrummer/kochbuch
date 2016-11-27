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
  constructor(public state:State, private listService:ListService, private router:Router) {
    this.loading = true;
    listService.getListDetails(state.selectedList.id).toPromise().then(res => {
        this.state.selectedList = res;
        this.loading = false;
    });
  }

  ngOnInit() {
    this.state.alerts = [];
  }


  addToBasket(product) {
    product.inBasket = !product.inBasket;
  }

  clearList() {
    this.listService.clearList(this.state.selectedList.id).toPromise().then((res:any) => {
      if (res) {
        this.state.selectedList.products = [];
      }
    });
  }

  removeItem(product,) {
    this.listService.removeItem(product.id).toPromise().then((res:any) => {
      if (res.success) {
        this.state.selectedList.products.splice(this.state.selectedList.products.indexOf(product),1);
      }
    });
  }

  removeList(){
    if (!this.state.selectedList.products.length) {
      this.listService.removeList(this.state.selectedList.id).toPromise().then((res:any) => {
        if (res) {
          this.state.selectedList = null;
        }
      })
    } else {

    }
  }

  addProductsToList(){
    this.router.navigate(['list',this.state.selectedList.id, 'products']);
  }

}
