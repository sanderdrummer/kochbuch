import * as actions from './productActions';
import {addProduct} from './productActions';

function handleAddProduct(state, product){
    if (product && product.name) {
        const newState = {...state};
        newState[product.name] = product;
        return newState;
    }

    return state;
}

function handleInitProducts(state, products){
    return {
        ...state,
        ...products
    }
}

const productReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.ADD_PRODUCT: return handleAddProduct(state, action.payload);
        case actions.INIT_PRODUCTS: return handleInitProducts(state, action.payload);
        default: return state;
    }
};

export default productReducer;