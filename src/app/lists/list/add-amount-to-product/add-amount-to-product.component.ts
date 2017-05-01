import {Component, OnInit, Output, EventEmitter, ElementRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {ListStore} from '../../shared/list.store';
import {ProductModel} from '../../products/product.model';
import {ProductsStore} from '../../products/products.store';

@Component({
  selector: 'kb-add-amount-to-product',
  templateUrl: './add-amount-to-product.component.html',
  styleUrls: ['./add-amount-to-product.component.scss']
})
export class AddAmountToProductComponent implements OnInit {
  @Output() onAddProduct = new EventEmitter();
  product:ProductModel;
  amountForm:FormGroup;

  constructor(private el:ElementRef, private location:Location, public listStore:ListStore, store:ProductsStore, fb:FormBuilder) {
    document.body.scrollTop = 0;
    this.amountForm = fb.group({
      amount: ['1', Validators.required]
    });

    store.state$.map((state) => state.selectedProduct).subscribe((product) => {
      this.product = product;
    });

  }

  ngOnInit() {
    this.el.nativeElement.querySelector('.amount-input').focus();
  }

  ngOnChanges(){

  }

  addProductToList(amount) {
      this.listStore.addProductWithAmountToList(amount, this.product).then((res) => {
        this.onAddProduct.emit();
        this.location.back();
      });
  }

  goBack(){
    this.location.back();
  }

}