import * as React from 'react';
import { withRouter } from 'react-router';
import { productLinkNameSpace } from '../../store';
import { SearchForm, Card } from '../../../../../..';

// tslint:disable-next-line:no-any
type Props = any;

const handleAmountSubmit = (amount: string, props: Props) => {
  props.addProductLink({
    id: 'product-link' + Date.now(),
    productId: props.match.params.product,
    linkId: 'list',
    amount,
    isActive: false,
  });
  props.history.goBack();
};

const ProductLinkCreator: React.SFC<Props> = (props) => (
  <Card level={0}>
    {JSON.stringify(props.match.params)}
    <SearchForm 
      state="productLinks" 
      reducerName={productLinkNameSpace} 
      onSubmit={(amount: string) => handleAmountSubmit(amount, props)} 
    />
  </Card>
);

export default withRouter(ProductLinkCreator);