import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as invoiceActions from '../../../Store/Invoices/invoiceActions';
import {Link} from 'react-router-dom';
import InvoiceList from '../../../Components/Invoice/InvoiceList/InvoiceList';
import Loader from '../../../Components/Ui/Loader/Loader';

class InvoiceOverview extends Component {


    componentDidMount () {
        this.props.fetchInvoices();
    }

    render() {

        let loader;
        if (this.props.ui.isLoading) {
            loader = (<button className="button loader is-primary"></button>);
        }


        return (
            <div>
                <Link className="m-b-1 button is-primary"
                      to={this.props.match.url + '/add'}>
                    neue Rechnung
                </Link>
                <Loader show={this.props.ui}/>
                <InvoiceList
                    list={Object.values(this.props.invoices)}/>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        invoices: state.invoices,
        ui: state.invoiceUi
    }
};

const mapDispatchToProps = dispatch =>{
    return {
        fetchInvoices: () => dispatch(invoiceActions.fetchInvoices())
    }
};

InvoiceOverview.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceOverview);