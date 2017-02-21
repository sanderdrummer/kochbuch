import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {ListStore} from '../../../shared/stores/list.store';
import {ProductsStore} from '../../../shared/stores/products.store';
import {ProductModel} from '../../../../../../src/models/product.model';
import {Location} from '@angular/common';

@Component({
  selector: 'kb-add-amount-to-product',
  templateUrl: './add-amount-to-product.component.html',
  styleUrls: ['./add-amount-to-product.component.scss']
})
export class AddAmountToProductComponent implements OnInit {
  @Output() onAddProduct = new EventEmitter();
  product:ProductModel;
  amountForm:FormGroup;

  constructor(private location:Location, public listStore:ListStore, store:ProductsStore, fb:FormBuilder) {
    document.body.scrollTop = 0;
    this.amountForm = fb.group({
      amount: ['1', Validators.required]
    });

    store.state$.map((state) => state.selectedProduct).subscribe((product) => {
      this.product = product;
    });
  }

  ngOnInit() {
  }

  ngOnChanges(){

  }

  addProductToList(amount) {
      this.listStore.addProductWithAmountToList(amount, this.product).then((res) => {
        this.onAddProduct.emit();
      });
  }

  goBack(){
    this.location.back();
  }

}
