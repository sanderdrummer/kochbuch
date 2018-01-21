import React from 'react';
import PropTypes from 'prop-types';
import ProductListItem from '../ProductListItem/ProductListItem';

const ProductList = (props) => (
    <nav className="panel">
        {props.products.map(product => <ProductListItem product={product} triggerOnClick={props.onSelect}/>)}
    </nav>
);


ProductList.propTypes = {
    products: PropTypes.array,
    onSelect: PropTypes.func
};

export default ProductList;