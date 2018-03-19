import * as React from 'react';
import { Product } from '../../..';
import { Card } from '../../../../..';
import { RouteComponentProps } from 'react-router';

// tslint:disable-next-line:no-any
interface Props extends Product, RouteComponentProps<any>, React.Props<any> { } 

const ProductLinkCreator: React.SFC<Props> = (props) => (
  <Card level={0}>
    {props.match.params}
  </Card>
);

export default ProductLinkCreator;