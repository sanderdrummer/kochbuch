import * as React from 'react';
import { Product } from '../';

type Props = { 
    products: Product[],
    onSelect(item: Product): void 
};

const ProductList: React.SFC<Props> = (props) => (
    <div>
        {props.products.map(product => <div 
            onClick={() => props.onSelect(product)} 
            key={product.id}
        > 
            {product.id} 
        </div>)}
    </div>
);

export default ProductList;