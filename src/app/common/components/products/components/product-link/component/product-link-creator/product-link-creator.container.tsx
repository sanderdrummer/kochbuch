import ProductLinkCreator from './product-link-creator';
import { uiActions, AppState, collectionActions } from '../../../../../..';
import { productLinkNameSpace, ProductLink } from '../../store';
import { Dispatch, connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

const mapStateToProps = (state: AppState): Partial<DispatchProps> => ({
}); 

interface DispatchProps {
  addProductLink(entry: ProductLink): void;
}
const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
  addProductLink: (entry: ProductLink) => dispatch(collectionActions.patchAndAdd<ProductLink>({
    namespace: productLinkNameSpace,
    endPoint: 'productLinks',
    entry,
    uiActions
  }))
});

export interface Props extends DispatchProps, RouteComponentProps<{product: string}> {}
export default connect(mapStateToProps, mapDispatchToProps)(ProductLinkCreator);