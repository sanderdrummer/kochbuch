import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InputButton from '../../../Components/Ui/AddItem/InputButton';

class ProductAmountCreator extends Component {

    state = {
        amount:''
    };

    updateAmount = (e) => {
        const amount = e.target.value;
        this.setState(() => {
            return {
                amount
            }
        });
    };

    onAddProductAmountItem = () => {
        if (this.state.amount) {
            const productAmountItem = this.props.product.getProductAmountItem(this.state.amount);
            this.props.onAddProductAmountItem(productAmountItem);
        }
    };

    render() {

        const name = (this.props.product.name ?  this.props.product.name : '');

        return (
            <div>
                <InputButton
                    buttonLabel={name + ' hinzufügen'}
                    placeholder="Menge"
                    value={this.state.amount}
                    triggerOnClick={this.onAddProductAmountItem}
                    updateValue={this.updateAmount}
                />
                <button
                    onClick={this.props.onReset}
                    type="button"
                    className="button is-secondary">
                    {name} nicht dazu
                </button>
            </div>
        )
    }
}

ProductAmountCreator.propTypes = {
    product: PropTypes.object,
    onAddProductAmountItem: PropTypes.func,
    onReset: PropTypes.func,
};


export default ProductAmountCreator;