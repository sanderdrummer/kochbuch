import { Reducer } from 'redux';
import { Actions } from '../common/actions';
import * as types from '../common/constants';

export interface Product {
    readonly title: string;
    readonly popularity: number;
}

export const initialState = {
    title: 'New Product',
    popularity: 0
};

const reducer: Reducer<Product> = (state: Product = initialState, action: Actions) => {
    switch (action.type) {
      case types.UPDATE:
        return updateProduct(state, action.payload);

      default:
        return state;
    }
};

function updateProduct(state: Product, product: Product) {
    return {...state, ...product};
}

export default reducer;