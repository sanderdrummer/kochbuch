import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  @Input() list;
  constructor() { }

  ngOnInit() {
  }

}
