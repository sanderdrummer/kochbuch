import ProductLinkCreator from './product-link-creator';
import { uiActions, AppState, collectionActions } from '../../../../../..';
import { productLinkNameSpace, ProductLink } from '../../store';
import { Dispatch, connect } from 'react-redux';

// tslint:disable-next-line:no-any
type Props = any;
const mapStateToProps = (state: Props): Props => ({

}); 

const mapDispatchToProps = (dispatch: Dispatch<AppState>) => ({
  addProductLink: (entry: ProductLink) => dispatch(collectionActions.patchAndAdd<ProductLink>({
    namespace: productLinkNameSpace,
    endPoint: 'productLinks',
    entry,
    uiActions
  }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductLinkCreator);