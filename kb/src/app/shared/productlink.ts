/**
 * Created by Tobias on 21.09.2016.
 */
export class ProductLink {
    id: number;
    product_id: number;
    recipe_id: number;
    amount: string;
    inBasket: boolean;
    name:string;

    constructor(config) {
        this.id = config.id;
        this.name = config.name;
        this.product_id = config.product_id || 0;
        this.recipe_id = config.recipe_id || 0;
        this.amount = config.amount || '1';
        this.inBasket = false;
    }

    toggleBasket() {
        this.inBasket = !this.inBasket;
    }
}
