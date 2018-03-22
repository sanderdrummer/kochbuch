import * as React from 'react';
import { ProductLink, SplitLayout } from '../../common';

type Props = {
  products: ProductLink[],
  onSelect(product: ProductLink): void
};

const ListProducts: React.SFC<Props> = ({products, onSelect}) => (
  <>
    {products.length ? products.map(product => (
    <div 
      onClick={() => onSelect(product)} 
      key={product.id}
    >
      <SplitLayout>
        <span>
            {product.productId}
        </span>
        <span>
            {product.amount}
        </span>
      </SplitLayout>
    </div>)) : 'is empty'}
  </>
);

export default ListProducts;