import { Recipe } from '../state';

export const initialState = (): Recipe => ({
    title: 'empty recipe',
    description: '',
    products: []
});

export const recipeWithUpdatedTitle = (): Recipe => ({
    title: 'updated title',
    description: '',
    products: []
});