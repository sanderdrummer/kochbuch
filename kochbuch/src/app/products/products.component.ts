import {Component, OnInit, ElementRef} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {ProductService} from './product.service';
import {State} from '../shared/app.state.service';

@Component({
  selector: 'kb-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit {
  addProduct: FormGroup;
  filtered: any[];

  constructor(public state: State, private elem: ElementRef, private api: ProductService, fb: FormBuilder) {
    this.addProduct = fb.group({
      search: [''],
      product: [''],
      amount: ['']
    });

    this.addProduct.controls['search'].valueChanges.subscribe((query: string) => this.filterAndSelectProduct(query));
  }

  ngOnInit() {
    if (!this.state.products.length) {
      this.api.getProducts().toPromise().then((res) => {
        this.state.products = res;
        this.filterProducts('');
      });
    } else {
      this.filterProducts('');
    }
    this.focusSearch();
  }

  focusSearch() {
    this.elem.nativeElement.querySelector('.search').focus();
  }

  filterAndSelectProduct(query: string) {
    this.filterProducts(query);
    if (query && this.filtered[0]) {
      this.addProduct.controls['product'].setValue(this.filtered[0].id);
    } else {
      this.addProduct.controls['product'].reset();
    }
  }

  filterProducts(query: string) {
    var count: number = 0;
    this.filtered = this.state.products.filter((product) => {
      if (product && product.name && query) {
        return product.name.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1;
      } else {
        return true;
      }
    });
    if (this.filtered.length > 25) {
      this.filtered = this.filtered.slice(0, 25);
    }

  }

  addProductToList() {
    if (this.addProduct.value.product) {
      this.selectProduct(this.addProduct.value.product, this.addProduct.value.amount);
    } else if (this.addProduct.value.search) {
      this.api.addNewProductToList(this.addProduct.value.search.toLowerCase(),
        this.addProduct.value.amount,
        this.state.selectedList.id).toPromise().then((res) => {
        if (res.item) {
          this.addItemAndReset(res.item);
        }
        if (res.product) {
          this.state.products.push(res.product);
          this.filterProducts(this.addProduct.value.search);
        }
      });
    }
  }

  selectProduct(id: number, amount: string = '1') {
    this.api.addProductToList(amount, id, this.state.selectedList.id).toPromise().then((res) => {
      if (res.item) {
        this.addItemAndReset(res.item);
      }
    });
  }

  addItemAndReset(item) {
    this.state.selectedList.products.push(item);
    this.addProduct.reset();
    this.focusSearch();
  }
}
