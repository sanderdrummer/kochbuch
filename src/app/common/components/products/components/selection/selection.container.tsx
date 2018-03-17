import { connect, Dispatch } from 'react-redux';
import Selection from './selection';
import { ProductSelectors, productNamespace } from '../../index';
import { AppState, collectionActions } from '../../../../';

const mapStateToProps = (state: AppState) => ({
    products: ProductSelectors.getFilteredCollectionAsList(state)
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>) => ({
  addProduct: (title: string) => 
    dispatch(collectionActions.addItem(productNamespace, {id: title, title, popularity: 0}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Selection);
