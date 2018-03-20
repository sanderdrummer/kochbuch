import * as React from 'react';
import { Product, ProductSelection } from '../../..';
import { RouteComponentProps } from 'react-router';

// tslint:disable-next-line:no-any
interface Props extends RouteComponentProps<any>, React.Props<any> { } 

const handleSelection = (product: Product, props: Props) => {
  props.history.push(props.match.url + '/' + product.id);
};

const Selector: React.SFC<Props> = (props) => (
  <ProductSelection handleSelection={(product) => handleSelection(product, props)} />
);

export default Selector;