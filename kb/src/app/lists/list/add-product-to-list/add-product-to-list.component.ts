import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {ProductsStore} from '../../../shared/stores/products.store';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'kb-add-product-to-list',
  templateUrl: './add-product-to-list.component.html',
  styleUrls: ['./add-product-to-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddProductToListComponent implements OnInit {
  constructor(public store:ProductsStore) {}

  searchControl:FormControl
  ngOnInit() {
    this.searchControl = new FormControl();
    this.searchControl.valueChanges.subscribe((query) => {
      this.store.updateFilteredProducts(query);
    });
  }

  ngOnDestroy(){

  }

}
