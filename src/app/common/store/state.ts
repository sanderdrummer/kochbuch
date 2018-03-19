import { Recipes } from '../../recipes/store/state';
import { Products, ProductLinkState } from '../components/products';

export type AppState = {
    recipes: Recipes
    products: Products
    productLinks: ProductLinkState
};