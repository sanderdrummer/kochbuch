import React, {Component} from 'react';
import ProductSelector from '../../Products/ProductSelector/ProductSelector';
import {connect} from 'react-redux';
import * as productSelectors from '../../../Store/Products/productSelectors';
import * as listSelectors from '../../../Store/Lists/listSelectors';
import * as productActions from '../../../Store/Products/productActions';
import * as listActions from '../../../Store/Lists/listActions';
import ListModel from '../../../Store/Lists/listModel';
import ProductAmountCreator from '../../Products/ProductAmountCreator/ProductAmountCreator';

class ShoppingListProductAdderContainer extends Component {

    onAddProductWithAmountToList = (item) =>{
        const config = new ListModel(this.props.list);
        config.toBasket = [...config.toBasket, item];
        this.props.onAddProductAmountItem(new ListModel(config));
    };

    render(){
        console.log(this.props);

        let show;

        if (this.props.product && this.props.product.name) {
            show = (
                <ProductAmountCreator
                    onReset={this.props.onResetSelectedProduct}
                    onAddProductAmountItem={this.onAddProductWithAmountToList}
                    product={this.props.product}
                />
            );
        } else {
            show = (<ProductSelector/>);

        }

        return (
            <div>
                <a
                    className="button is-secondary m-b-1"
                    onClick={this.props.history.goBack}>zurück</a>
                {show}
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        product: productSelectors.getSelected(state),
        list: listSelectors.getSelectedList(state)
    }
};

const mapDispatchToProps = dispatch =>{
    return {
        onAddProductAmountItem: (list) => dispatch(listActions.startAddList(list)),
        onResetSelectedProduct: () => dispatch(productActions.setSelected(''))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListProductAdderContainer);