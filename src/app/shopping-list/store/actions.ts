import { AppState } from './../../common/store/state';
import { Dispatch } from 'redux';
import { Api, collectionActions, ProductLink, uiActions } from '../../common';
import { productLinkNameSpace } from '../../common/components/products/components/product-link/store';

export const clearList = (ids: string[]) => (dispatch: Dispatch<AppState>) => {
  const requests = ids.map(id => Api.delete('productLinks/' + id, {}));
  Promise.all(requests).then(() => {
    dispatch(collectionActions.fetchAndSet<ProductLink>({
      namespace: productLinkNameSpace,
      endPoint: 'productLinks',
      uiActions
    }));
  });
};

export const toggleIsActive = (product: ProductLink) => (dispatch: Dispatch<AppState>) => {
  const updatedProduct = { ...product, isActive: !product.isActive };
  dispatch(collectionActions.updateItem<ProductLink>(productLinkNameSpace, updatedProduct));
};