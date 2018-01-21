import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as invoiceActions from '../../../Store/Invoices/invoiceActions';
import {Link} from 'react-router-dom';
import InvoiceList from '../../../Components/Invoice/InvoiceList/InvoiceList';
import InputButton from '../../../Components/Ui/AddItem/InputButton';

class InvoiceOverview extends Component {


    componentDidMount () {
        this.props.fetchInvoices();
    }

    render() {


        let linkButtonClasses = 'm-b-1 button is-primary';
        if (this.props.ui.isLoading) {
            linkButtonClasses += ' is-loading';
        }


        return (
            <div>
                <InputButton/>
                <Link className={linkButtonClasses}
                      to={this.props.match.url + '/add'}>
                    neue Rechnung
                </Link>
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