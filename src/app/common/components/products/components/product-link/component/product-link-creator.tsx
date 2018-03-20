import * as React from 'react';
import { Product } from '../../..';
import { Card, SearchForm } from '../../../../..';
import { RouteComponentProps } from 'react-router';
import { productLinkNameSpace } from '../store';

// tslint:disable-next-line:no-any
interface Props extends Product, RouteComponentProps<any>, React.Props<any> { } 

const handleAmountSubmit = (amount: string, props: Props) => {
  // tslint:disable-next-line:no-console
  console.log(amount, props.match.params);
};

const ProductLinkCreator: React.SFC<Props> = (props) => (
  <Card level={0}>
    {JSON.stringify(props.match.params)}
    <SearchForm 
      state="productLinks" 
      reducerName={productLinkNameSpace} 
      onSubmit={(amount) => handleAmountSubmit(amount, props)} 
    />
  </Card>
);

export default ProductLinkCreator;