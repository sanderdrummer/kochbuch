import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {ListStore} from '../../../shared/stores/list.store';

@Component({
  selector: 'kb-add-amount-to-product',
  templateUrl: './add-amount-to-product.component.html',
  styleUrls: ['./add-amount-to-product.component.scss']
})
export class AddAmountToProductComponent implements OnInit {
  @Input() product;
  @Output() onAddProduct = new EventEmitter();
  amountForm:FormGroup;

  constructor(public listStore:ListStore, fb:FormBuilder) {
    document.body.scrollTop = 0;
    this.amountForm = fb.group({
      amount: ['1', Validators.required]
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

}
