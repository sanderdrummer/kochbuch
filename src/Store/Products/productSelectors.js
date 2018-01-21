import {createSelector} from 'reselect';
import ProductModel from './productModel';

export const getProducts = (state) => state.products;
export const getProductUi = (state) => state.productUi;


export const getFilterString = createSelector([getProductUi], (ui) =>{
    return ui.filterString;
});

export const getProductList = createSelector([getProducts], (products) =>{
    return Object.values(products).map(product => new ProductModel(product));
});

export const getFilteredProductList = createSelector([getProductList, getFilterString], (products, filterString) =>{

    let list = [];
    if (filterString) {
        list = products.filter((product) => product.name.includes(filterString));
    } else {
        list = products;
    }
    return list;
});

export const getSortedFilteredProductlist = createSelector([getFilteredProductList], (list) => {
    return [...list].sort((a,b) => b.popularity - a.popularity);
});

export const getSelected = createSelector([getProducts, getProductUi], (products, ui) =>{

    if (ui.selected && products[ui.selected]) {
        return products[ui.selected];
    } else {
        return {};
    }
});