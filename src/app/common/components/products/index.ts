import reducer from './store/products';
export { default as ProductSelection } from './components/selection/selection.container';
export { Products, Product, productUiNameSpace as productNamespace } from './store/products';
export { default as ProductSelectors } from './store/selectors';

export default {
    reducer,
};
