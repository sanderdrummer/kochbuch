import { Product } from '../product/reducer';
import { Actions } from '../common/actions';
import product from '../product/reducer';
import * as types from '../common/constants';

export type Collection = {[title: string]: Product};

const reducer = (state: Collection, action: Actions) => {
    switch (action.type) {
        case types.ADD: return addProduct(state, action.payload);
        case types.UPDATE: return product(state[action.payload.title], action);
        default: return state;
    }
};

function addProduct (state: Collection, newProduct: Product) {
    return {...state, [newProduct.title]: newProduct};
}

export default reducer;