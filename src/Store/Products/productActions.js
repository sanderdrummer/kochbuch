import productService from './productService';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const addProduct = (product) =>{
    return {
        type: ADD_PRODUCT,
        payload: product
    }
};
export const SET_SELECTED = 'SET_SELECTED_PRODUCT';
export const setSelected = (name) =>{
    return {
        type: SET_SELECTED,
        payload: name
    }
};
export const RESET_UI = 'RESET_UI_PRODUCT';
export const resetUi = (name) =>{
    return {
        type: RESET_UI,
        payload: name
    }
};

export const START_ADD_PRODUCT = 'START_ADD_PRODUCT';
export const startAddProduct = (product) =>{
    return dispatch =>{
        productService.updateProduct(product).then((res) =>{
                dispatch(addProduct(product));
            }
        );
    }
};

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const fetchProducts = () =>{
    return (dispatch) => {
        productService.getProducts().then(res =>{
            if (res.data) {
                dispatch(initProducts(res.data));
            }
        });
    }
};

export const INIT_PRODUCTS = 'INIT_PRODUCTS';
export const initProducts = (products) =>{
    return {
        type: INIT_PRODUCTS,
        payload: products
    }
};

export const UPDATE_PRODUCT_FILTER = 'UPDATE_PRODUCT_FILTER';
export const updateProductFilter = (products) =>{
    return {
        type: UPDATE_PRODUCT_FILTER,
        payload: products
    }
};
export const UPDATE_PRODUCT_ERROR = 'UPDATE_PRODUCT_ERROR';
export const updateProductError = (err) =>{
    return {
        type: UPDATE_PRODUCT_ERROR,
        payload: err
    }
};