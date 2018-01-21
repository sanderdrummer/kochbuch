import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Aux from '../../Shared/Layout/Auxiliary/auxiliary';
import ShoppingListDetailsContainer from './Details/ShoppingListDetailsContainer';
import ShoppingListProductAdderContainer from './ProductAdder/ShoppingListProductAdderContainer';
import ShoppingListContainer from './Selector/ShoppingListSelectorContainer';
import withRouter from 'react-router-dom/es/withRouter';


class ShoppingListLayoutContainer extends Component {

    render() {
        return (
            <Aux>
                <Route path={this.props.match.url} exact component={ShoppingListContainer} />
                <Route path={this.props.match.url + '/:list'} exact component={ShoppingListDetailsContainer} />
                <Route path={this.props.match.url + '/:list/add'} exact component={ShoppingListProductAdderContainer} />
            </Aux>
        );
    }
}

export default withRouter(ShoppingListLayoutContainer);