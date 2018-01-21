import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as invoiceActions from '../../../Store/Invoices/invoiceActions';
import {InvoiceModel} from '../../../Store/Invoices/invoiceModel';
import AddItem from '../../../Components/Ui/AddItem/AddItem';
import IfElse from '../../../Components/Ui/IfElse/IfElse';

class InvoiceAdderContainer extends Component {

    state = {
        value: ''
    };

    componentDidUpdate = () => {
        if (this.props.ui && this.props.ui.invoiceDone) {
            this.props.history.goBack();
        }
    };

    updateValue = (e) =>{
        const value = e.target.value;

        this.setState(() =>{
            return {
                value
            }
        });
    };

    addInvoice = () =>{
        const invoice = new InvoiceModel({value: this.state.value});
        this.props.addInvoice(invoice);
    };

    render(){

        const content = 'Rechnung wird erstellt';

        return (
            <IfElse if={!this.props.ui.isLoading} else={content}>
                <h1>Neue Rechnung hinzufügen</h1>
                <AddItem
                    inputType='number'
                    placeholder="Einkaufswert"
                    buttonLabel="Neue Rechung"
                    triggerOnClick={this.addInvoice}
                    updateValue={this.updateValue}
                    value={this.state.value}
                />
                <button
                    onClick={this.props.history.goBack}
                    className="button m-t-1 is-full-width is-secondary">
                    zurück
                </button>
            </IfElse>
        )
    }
}

const mapStateToProps = state =>{
    return {
        ui: state.invoiceUi
    }
};

const mapDispatchToProps = dispatch =>{
    return {
        addInvoice: (invoice) => dispatch(invoiceActions.patchInvoice(invoice))
    }
};

InvoiceAdderContainer.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceAdderContainer);