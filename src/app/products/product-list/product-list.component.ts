import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductStore} from '../shared/product.store';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProductModel} from '../shared/product.model';
import {ProductService} from '../shared/product.service';

@Component({
  selector: 'kb-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Output() onSelect = new EventEmitter();

  products$;
  filterForm: FormGroup;

  constructor(private productService: ProductService,
              private productStore: ProductStore,
              private fb: FormBuilder) {

  }

  ngOnInit() {
    this.filterForm = this.fb.group({
      filter: ['']
    });

    this.filterForm.controls.filter.valueChanges.subscribe(value => {
      this.filterProducts(value);
    });

    this.products$ = this.productStore.getFilteredProducts();
  }

  addProduct(title: string): void {
    const product = new ProductModel(title);
    this.productService.createProduct(title).then((res) => {
      this.selectProduct(product);
    });
  }

  selectProduct(product: ProductModel): void {
    this.onSelect.emit({product});
  }

  filterProducts(query: string): void {
    this.productStore.setFilteredProducts(query);
  }

}
