import * as React from 'react';
import { productLinkNameSpace } from '../../store';
import { SearchForm } from '../../../../../..';
import { Props } from './product-link-creator.container';

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
    <SearchForm 
      state="productLinks" 
      reducerName={productLinkNameSpace} 
      onSubmit={(amount: string) => handleAmountSubmit(amount, props)} 
    />
);

export default ProductLinkCreator;