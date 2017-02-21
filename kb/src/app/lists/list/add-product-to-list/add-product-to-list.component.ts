import {Component, OnInit, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import {ProductsStore} from '../../../shared/stores/products.store';
import {FormControl} from '@angular/forms';
import {MdSidenav} from '@angular/material';
import {Location} from '@angular/common';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'kb-add-product-to-list',
  templateUrl: './add-product-to-list.component.html',
  styleUrls: ['./add-product-to-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddProductToListComponent implements OnInit {

  constructor(public activeRoute:ActivatedRoute, public router:Router, public store: ProductsStore, private location:Location) {
  }

  searchControl: FormControl;
  searchSubscription;
  ngOnInit() {
    this.searchControl = new FormControl();
    this.searchSubscription = this.searchControl.valueChanges.subscribe((query) => {
      this.store.updateFilteredProducts(query);
    });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  selectProduct(product) {
    this.searchControl.reset();
    this.store.selectProduct(product);
    this.router.navigate(['../amount'], {relativeTo: this.activeRoute});
  }

  addProduct(title: string) {
    this.store.addProduct(title).then((product) => {
      this.selectProduct(product);
    });
  }

  removeProduct(title) {
    this.store.removeProduct(title).then(() => this.searchControl.reset());
  }

  goBack(){
    this.location.back();
  }
}
