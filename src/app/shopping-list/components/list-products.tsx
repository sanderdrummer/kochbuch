import * as React from 'react';
import { ProductLink } from '../../common';

type Props = {
  products: ProductLink[],
  onSelect(product: ProductLink): void
};

const ListProducts: React.SFC<Props> = ({products, onSelect}) => (
  <>
    {products.map(product => (
    <div 
      onClick={() => onSelect(product)} 
      key={product.id}
    >
      {product.productId} - {product.amount}
    </div>))}
  </>
);

export default ListProducts;