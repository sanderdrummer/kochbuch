import { connect, Dispatch } from 'react-redux';
import Selection from './selection';
import { ProductSelectors, productNamespace, Product } from '../../index';
import { AppState, collectionActions, uiActions } from '../../../../';

const mapStateToProps = (state: AppState) => ({
    products: ProductSelectors.getFilteredCollectionAsList(state)
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>) => ({
  addProduct: (title: string) => {
    return dispatch(collectionActions.patchAndAdd({
      namespace: productNamespace,
      endPoint: 'products',
      uiActions,
      entry: {
        id: title,
        popularity: 0
      },
    }));
  },
  fetchProducts: () => 
    dispatch(collectionActions.fetchAndSet<Product>({
      namespace: productNamespace,
      endPoint: 'products',
      uiActions
    })) 
});

export default connect(mapStateToProps, mapDispatchToProps)(Selection);
