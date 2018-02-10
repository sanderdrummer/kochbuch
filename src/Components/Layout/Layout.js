import React from 'react';
import {NavLink, Route} from 'react-router-dom';
import ShoppingListContainer from '../../Containers/ShoppingList/ShoppingListLayout';
import InvoiceLayout from '../../Containers/Invoices/Layout/InvoiceLayout';
import UserAuthForm from '../../Containers/User/UserAuthForm/UserAuthForm';

const Layout = (props) => (
    <div>
        <nav className="navbar has-shadow" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-tabs">
                    <NavLink activeClassName="is-active"
                             className="navbar-item is-tab"
                             to="/lists">Listen</NavLink>
                    <NavLink activeClassName="is-active"
                             className="navbar-item is-tab"
                             to="/recipies">Rezepte</NavLink>
                    <NavLink activeClassName="is-active"
                             className="navbar-item is-tab"
                             to="/invoices">Rechnungen</NavLink>
                    <NavLink activeClassName="is-active"
                             exact
                             className="navbar-item is-tab"
                             to="/">Login</NavLink>
                </div>
            </div>
        </nav>
        <div className="section">
            <div className="container">
                <Route path="/lists" component={ShoppingListContainer}/>
                <Route path="/invoices" component={InvoiceLayout}/>
                <Route path="/" exact component={UserAuthForm}/>
            </div>
        </div>
    </div>
);


Layout.propTypes = {};

export default Layout;