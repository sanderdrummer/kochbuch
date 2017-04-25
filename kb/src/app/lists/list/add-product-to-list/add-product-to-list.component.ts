import {Component, OnInit, ChangeDetectionStrategy, ElementRef} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Location} from '@angular/common';
import {Router, ActivatedRoute} from '@angular/router';
import {ProductsStore} from '../../products/products.store';

@Component({
  selector: 'kb-add-product-to-list',
  templateUrl: './add-product-to-list.component.html',
  styleUrls: ['./add-product-to-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddProductToListComponent implements OnInit {

  constructor(private el: ElementRef,
              public activeRoute: ActivatedRoute,
              public router: Router,
              public store: ProductsStore, private location: Location) {
  }

  searchControl: FormControl;
  searchSubscription;

  ngOnInit() {
    this.searchControl = new FormControl();
    this.searchSubscription = this.searchControl.valueChanges.subscribe((query) => {
      this.store.updateFilteredProducts(query);
    });
    this.el.nativeElement.querySelector('.search-input').focus();
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

  goBack() {
    this.location.back();
  }
}
