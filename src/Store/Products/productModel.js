import {ProductAmountModel} from '../ProductAmountItems/productAmountModel';

class ProductModel {

    name;
    popularity;

    constructor(config = {}){
        this.name = config.name || '';
        this.popularity = config.popularity + 1 || 0;
    }

    getProductAmountItem(amount) {
        return new ProductAmountModel(this.name, amount);
    }
}

export default ProductModel