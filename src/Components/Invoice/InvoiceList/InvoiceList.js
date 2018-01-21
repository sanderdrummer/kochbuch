import React from 'react';
import PropTypes from 'prop-types';

const InvoiceList = (props) => (
    <nav className="panel">
        {props.list.map((invoice, index) => (
            <p key={index}
               className="panel-block">
                <span>
                {Number(invoice.value).toLocaleString('de-DE', {style: 'currency', currency: 'EUR'})}
                </span>
                <span className="grow has-text-right">{new Date(invoice.from).toLocaleDateString()}</span>
            </p>)
        )}
    </nav>
);


InvoiceList.propTypes = {
    list: PropTypes.array
};

export default InvoiceList;