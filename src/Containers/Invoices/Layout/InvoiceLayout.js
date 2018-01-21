import React, {Component} from 'react';
import {Route} from 'react-router';
import Aux from '../../../Shared/Layout/Auxiliary/auxiliary';
import InvoiceOverview from '../Overview/InvoiceOverview';
import InvoiceAdderContainer from '../Adder/InvoiceAdder';

class InvoiceLayout extends Component {

    render() {
        return (
            <Aux>
                <Route path={this.props.match.url} exact component={InvoiceOverview} />
                <Route path={this.props.match.url + '/add'} exact component={InvoiceAdderContainer} />
            </Aux>
        )
    }
}


export default (InvoiceLayout);