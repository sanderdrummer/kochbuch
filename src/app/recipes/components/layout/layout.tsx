import * as React from 'react';
import Selection from '../selection/selection.container';
import { ProductSelection, Product } from '../../../common/components/products';
import { Card } from '../../../common';

const handleSelection = (product: Product) => {
  // tslint:disable-next-line:no-console
  console.log(product, 'outer');
};

const Layout: React.SFC = () => (
  <Card level={4}>
    <ProductSelection handleSelection={handleSelection} />
        <Selection />
  </Card>
);

export default Layout;
