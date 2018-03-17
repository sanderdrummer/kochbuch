import { Recipes } from '../../recipes/store/state';
import { Products } from '../components/products';

export type AppState = {
    recipes: Recipes
    products: Products
};