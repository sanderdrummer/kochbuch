import List from './list';
import { connect, Dispatch } from 'react-redux';
import { AppState, collectionActions, uiActions } from '../../common';
import { ProductLink } from '../../common/components/products';
import { productLinkNameSpace } from '../../common/components/products/components/product-link/store';
import { getActiveItems, getInActiveItems } from '../store/selectors';
import { clearList, toggleIsActive } from '../store/actions';

interface DispatchProps {
  fetchProducts(): void;
  clearList(ids: string[]): void;
  toggleIsActive(product: ProductLink): void;  
}

interface StateProps {
  inActiveProducts: ProductLink[];
  activeProducts: ProductLink[];
}

export interface Props extends DispatchProps, StateProps {}

const mapStateToProps = (state: AppState): StateProps => ({
  inActiveProducts: getInActiveItems(state),
  activeProducts: getActiveItems(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
  fetchProducts: () =>
    dispatch(collectionActions.fetchAndSet<ProductLink>({
      namespace: productLinkNameSpace,
      endPoint: 'productLinks',
      uiActions
    })),
  clearList: (ids: string[]) => dispatch(clearList(ids)),
  toggleIsActive: (product: ProductLink) => dispatch(toggleIsActive(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(List);