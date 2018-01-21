import React from 'react';
import PropTypes from 'prop-types';

const NamedListSelector = (props) => {

    let header;
    if (props.headerLabel) {
        header = (
            <p className="panel-heading">
                {props.headerLabel}
            </p>
        );
    }

    return (
        <div>
            <nav className="panel">
                {header}
                {props.items ? props.items.map(item => (
                        <a className="panel-block"
                           onClick={() => props.onSelect(item)}
                           key={item.name}>{item.name}
                        </a>
                    )
                ): null}
            </nav>
        </div>
    )
};


NamedListSelector.propTypes = {
    items: PropTypes.array,
    onSelect: PropTypes.func,
    headerLabel: PropTypes.string,
};

export default NamedListSelector;