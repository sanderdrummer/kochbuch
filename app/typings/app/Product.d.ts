/**
 * Created by Tobias on 23.08.2016.
 */
declare namespace WP {
    export interface Product {
        id:number;
        name:string;
        amount?:string;
        product_id?: number;
        recipe_id?: number;
        list_id?: number;
    }
}