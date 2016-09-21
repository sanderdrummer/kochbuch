import {ProductLink} from './productlink';
export class List {
    id:number;
    name:string;
    products: ProductLink[];

    constructor(config) {
        this.id = config.id;
        this.name = config.name;
        this.products = config.products || [];
    }
}
