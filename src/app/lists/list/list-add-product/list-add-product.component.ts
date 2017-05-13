import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductListComponent} from '../../../products/product-list/product-list.component';
import {ListStore} from '../../shared/list.store';

@Component({
  selector: 'kb-list-add-product',
  templateUrl: './list-add-product.component.html',
  styleUrls: ['./list-add-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListAddProductComponent implements OnInit {
  @ViewChild(ProductListComponent) productList;
  private listTitle: string;


  constructor(private route: ActivatedRoute,
              private listStore: ListStore) {
  }

  ngOnInit(): void {
    this.listTitle = this.route.snapshot.params['title'];
  }

  addProductWithAmountToList({selectedProduct}): void {
    this.listStore.addProductToList(selectedProduct).then(() => {
      this.productList.reset();
    });
  }
}
