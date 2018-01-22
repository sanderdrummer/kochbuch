import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as invoiceActions from '../../../Store/Invoices/invoiceActions';
import {Link} from 'react-router-dom';
import InvoiceList from '../../../Components/Invoice/InvoiceList/InvoiceList';
import InputButton from '../../../Components/Ui/AddItem/InputButton';

class InvoiceOverview extends Component {


    updateFilterDate = (e) => {
        const date = e.target.value;
        this.props.updateFilterDate(date);
    };

    fetchInvoices = () => {
        const date = new Date(this.props.ui.filterDate);
        this.props.fetchInvoices(date);

    };

    componentDidMount(){
        const date = new Date(this.props.ui.filterDate);
        this.props.fetchInvoices(date);
    }

    render(){


        let linkButtonClasses = 'm-b-1 button is-primary';
        if (this.props.ui.isLoading) {
            linkButtonClasses += ' is-loading';
        }


        return (
            <div>
                <InputButton
                    inputType="date"
                    value={this.props.ui.filterDate}
                    updateValue={this.updateFilterDate}
                    isLoading={this.props.ui.isLoading}
                    triggerOnClick={this.fetchInvoices}
                    buttonLabel="Rechnungen filtern"
                />
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
        fetchInvoices: (date) => dispatch(invoiceActions.fetchInvoices(date)),
        updateFilterDate: (date) => dispatch(invoiceActions.updateInvoiceFilter(date))
    }
};

InvoiceOverview.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceOverview);