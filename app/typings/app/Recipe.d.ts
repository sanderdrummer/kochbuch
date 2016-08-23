declare namespace WP {
    export interface Recipe {
        id:number;
        name:string;
        description?:string;
        products?: Product[]
    }
}