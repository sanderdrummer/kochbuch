import React, {Component} from 'react';
import Link from 'react-router-dom/es/Link';
import {connect} from 'react-redux';
import * as listSelectors from '../../../Store/Lists/listSelectors';
import * as listActions from '../../../Store/Lists/listActions';
import ProductListItem from '../../../Components/Product/ProductListItem/ProductListItem';
import ListModel from '../../../Store/Lists/listModel';

class ShoppingListDetailsContainer extends Component {


    fromListToBasket = (item) =>{
        const toBasket = this.props.details.toBasket.filter(inItem => inItem !== item);
        const inBasket = [...this.props.details.inBasket, item];
        const list = new ListModel({
            ...this.props.details,
            toBasket,
            inBasket
        });

        this.props.updateList(list);
    };

    fromBasketToList = (item) =>{
        const toBasket = [...this.props.details.toBasket, item];
        const inBasket = this.props.details.inBasket.filter(inItem => inItem !== item);
        const list = new ListModel({
            ...this.props.details,
            toBasket,
            inBasket
        });

        this.props.updateList(list);
    };

    clear = () =>{
        this.props.updateList({
            ...this.props.details,
            toBasket: [],
            inBasket: []
        });
    };

    render(){
        console.log(this.props);
        return (
            <div>
                <Link
                    className="button is-secondary m-b-1"
                    to={this.props.match.url + '/add'}>Produkt hinzufügen</Link>
                <ProductListItem
                    onSelect={this.fromListToBasket}
                    headerLabel="Noch dazu"
                    items={this.props.details.toBasket}
                />
                <ProductListItem
                    onSelect={this.fromBasketToList}
                    headerLabel="Schon dabei"
                    items={this.props.details.inBasket}
                />
                <button type="text"
                        className="button is-secondary"
                        onClick={this.clear}>
                    Liste löschen
                </button>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        details: listSelectors.getSelectedList(state)
    }
};

const mapDispatchToProps = dispatch =>{
    return {
        updateList: (list) => dispatch(listActions.startAddList(list))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListDetailsContainer);