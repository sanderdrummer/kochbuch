import React from 'react';
import PropTypes from 'prop-types';

const ProductListItem = (props) =>{
    let header;
    if (props.headerLabel) {
        header = (
            <p className="panel-heading">
                {props.headerLabel}
            </p>
        );
    }

    return (
        <div className="m-b-1">
            <nav className="panel">
                {header}
                {props.items.map(item => (
                        <a className="panel-block"
                           onClick={() => props.onSelect(item)}
                           key={item.name}>{item.name} {item.amount}
                        </a>
                    )
                )}
            </nav>
        </div>
    )
};


ProductListItem.propTypes = {
    items: PropTypes.array,
    onSelect: PropTypes.func,
    headerLabel: PropTypes.string,
};

export default ProductListItem;