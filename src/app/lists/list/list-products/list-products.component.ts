import {Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'kb-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  @Input() products;
  @Input() icon;
  @Output() onSelect = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  select(item, index){
    this.onSelect.emit({item,index});
  }
}
