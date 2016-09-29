import {Component, OnInit} from '@angular/core';
import {List} from "../../shared/list";
import {Input} from "@angular/core/src/metadata/directives";
import {ProductLink} from "../../shared/productlink";
import {ListService} from "../../shared/list.service";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
    @Input() list:List;
    constructor( private api:ListService) {
    }

    ngOnInit() {
    }

    addToBasket(product:ProductLink) {
        product.inBasket = !product.inBasket;
    }

    clearList(id:number) {
        this.api.clearList(id).toPromise().then((res:any) => {
            if (res) {
                this.list.products = [];
            }
        });
    }

    removeList(id:number){
        if (!this.list.products.length) {
            this.api.removeList(id).toPromise().then((res:any) => {
                if (res) {
                    this.list = new List({});
                }
            }).catch((err:any) => {
                console.log(err);
            })
        } else {

        }
    }
}
