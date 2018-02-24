import { Product } from '../reducer';

export const getUpdatedProduct = (): Product => ({
    title: 'test product',
    popularity: 0
});