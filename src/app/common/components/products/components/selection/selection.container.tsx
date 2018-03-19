import { connect, Dispatch } from 'react-redux';
import Selection from './selection';
import { ProductSelectors, productNamespace, Product } from '../../index';
import { AppState, collectionActions, CollectionState } from '../../../../';

const mapStateToProps = (state: AppState) => ({
    products: ProductSelectors.getFilteredCollectionAsList(state)
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>) => ({
  addProduct: (title: string) => 
    dispatch(collectionActions.addItem(productNamespace, {id: title, title, popularity: 0})),
    // tslint:disable-next-line:no-any
  setProducts: (products: CollectionState<Product>) => 
    dispatch(collectionActions.set<Product>(productNamespace, products))
});

export default connect(mapStateToProps, mapDispatchToProps)(Selection);
