import * as React from 'react';
import Selection from '../selection/selection.container';
import { ProductSelection } from '../../../common/components/products';
import { Card } from '../../../common';

const Layout: React.SFC<{}> = () => (
  <Card level={4}>
        <ProductSelection />>
        <Selection />
  </Card>
);

export default Layout;
