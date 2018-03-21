import * as React from 'react';
import { Product, ProductSelection } from '../../..';
import { RouteComponentProps } from 'react-router';

interface Props extends RouteComponentProps<{}> { } 

const handleSelection = (product: Product, props: Props) => {
  props.history.push(props.match.url + '/' + product.id);
};

const Selector: React.SFC<Props> = (props) => (
  <div>
    <ProductSelection handleSelection={(product) => handleSelection(product, props)} />
    <button onClick={() => props.history.goBack()}>go back</button>
  </div>
);

export default Selector;