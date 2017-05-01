import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
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
  @ViewChild('amount') private amountElement: ElementRef;
  @ViewChild('filterName') private filterElement: ElementRef;

  products$;
  filterForm: FormGroup;
  amountForm: FormGroup;
  selectedProduct: ProductModel;

  constructor(private productService: ProductService,
              private productStore: ProductStore,
              private fb: FormBuilder) {

  }

  ngOnInit() {
    this.filterForm = this.fb.group({
      filter: [''],
    });
    this.amountForm = this.fb.group({
      amount: [1]
    });

    this.filterForm.controls.filter.valueChanges.subscribe(value => {
      this.filterProducts(value);
    });

    this.products$ = this.productStore.getFilteredProducts();
  }

  ngAfterViewInit() {
    this.filterElement.nativeElement.focus();
  }

  addProduct(title: string): void {
    console.log(title);
    const product = new ProductModel({title});
    this.productService.createProduct(title)
      .then(() => {
        this.selectProduct(product);
      });
  }

  selectProduct(product: ProductModel): void {
    this.selectedProduct = product;
    setTimeout(() => {
      this.amountElement.nativeElement.focus();
    },100);
  }

  filterProducts(query: string): void {
    this.productStore.setFilteredProducts(query);
  }

  selectProductWithAmount(amount: number) {
    this.onSelect.emit({
      selectedProduct: this.selectedProduct,
      amount: amount
    });
  }
}
