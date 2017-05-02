import {Component, ElementRef, EventEmitter, OnInit, Output, AfterViewInit, ViewChild} from '@angular/core';
import {ProductStore} from '../shared/product.store';
import {FormBuilder, FormGroup, AbstractControl} from '@angular/forms';
import {ProductModel} from '../shared/product.model';
import {ProductService} from '../shared/product.service';
import {ProductListComponentInterface} from './product-list-component.interface';

@Component({
  selector: 'kb-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit, ProductListComponentInterface {
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

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      filter: [''],
    });
    this.amountForm = this.fb.group({
      amount: [1]
    });
    this.subscribeToFilterChanges();
    this.products$ = this.productStore.getFilteredProducts();
  }

  ngAfterViewInit(): void {
    this.focusProduct();
  }

  subscribeToFilterChanges() {
    const filterControl: AbstractControl = this.filterForm.controls.filter;
    filterControl.valueChanges.subscribe(value => this.filterProducts(value));
  }

  addProduct(title: string): void {
    const product = new ProductModel({title});
    this.productService.createProduct(title)
      .then(() => {
        this.selectProduct(product);
      });
  }

  selectProduct(product: ProductModel): void {
    this.selectedProduct = product;
    this.focusAmount();
  }

  filterProducts(query: string): void {
    this.productStore.setFilteredProducts(query);
  }

  selectProductWithAmount(amount: number): void {
    this.onSelect.emit({
      selectedProduct: this.selectedProduct,
      amount: amount
    });
  }

  reset(): void {
    this.filterForm.reset({filter: ''});
    this.amountForm.reset({amount: 1});
    this.focusProduct();
  }

  focusAmount(): void {
    setTimeout(() => {
      this.amountElement.nativeElement.focus();
    }, 100);
  }

  focusProduct(): void {
    setTimeout(() => {
      this.filterElement.nativeElement.focus();
    }, 100);
  }
}
