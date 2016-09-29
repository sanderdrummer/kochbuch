import {Component, OnInit, Input, ElementRef} from '@angular/core';
import {ProductService} from "../shared/product.service";
import {Product} from "../shared/product";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {List} from "../shared/list";
import {ProductLink} from "../shared/productlink";

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    providers: [ProductService]
})
export class ProductsComponent implements OnInit {
    @Input() list:List;
    products:Product[];
    filtered:Product[];
    addProduct:FormGroup;

    constructor(private elem:ElementRef, private api: ProductService, fb:FormBuilder) {
        this.addProduct = fb.group({
            search:[''],
            product: [''],
            amount: ['']
        });

        this.addProduct.controls['search'].valueChanges.subscribe((query:string) => this.filterAndSelectProduct(query));
    }

    ngOnInit() {
        this.api.getProducts().toPromise().then((res) => {
            this.products = res;
            this.filterProducts('');
        });

        this.focusSearch();

    }

    focusSearch(){
        this.elem.nativeElement.querySelector('.search').focus();
    }

    filterAndSelectProduct(query:string) {
        this.filterProducts(query);
        if (query && this.filtered[0]) {
            this.addProduct.controls['product'].setValue(this.filtered[0].id);
        } else {
            this.addProduct.controls['product'].reset();
        }
    }

    filterProducts(query:string) {
        var count:number = 0;
        this.filtered = this.products.filter((product:Product) => {
            if (product && product.name && query) {
                return product.name.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1;
            } else {
                return true;
            }
        });
        if (this.filtered.length > 25) {
            this.filtered = this.filtered.slice(0,25);
        }

    }

    addProductToList() {
        if (this.addProduct.value.product) {
            this.selectProduct(this.addProduct.value.product, this.addProduct.value.amount);
        } else if (this.addProduct.value.search) {
            this.api.addNewProductToList(this.addProduct.value.search.toLowerCase(), this.addProduct.value.amount, this.list.id).toPromise().then((res) => {
                if (res.item) {
                    this.addItemAndReset(res.item);
                }
                if (res.product) {
                    this.products.push(new Product(res.product));
                    this.filterProducts(this.addProduct.value.search);
                }
            });
        }
    }

    selectProduct(id:number, amount:string = '1'){
        this.api.addProductToList(amount, id, this.list.id).toPromise().then((res) => {
            if (res.item) {
                this.addItemAndReset(res.item);
            }
        });
    }

    addItemAndReset(item:ProductLink) {
        this.list.products.push(new ProductLink(item));
        this.addProduct.reset();
        this.focusSearch();
    }

}
