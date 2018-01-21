import React, {Component} from 'react';
import * as productSelectors from '../../../Store/Products/productSelectors';
import * as productActions from '../../../Store/Products/productActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import AddItem from '../../../Components/Ui/AddItem/AddItem';
import ProductModel from '../../../Store/Products/productModel';
import NamedListSelector from '../../../Components/Ui/NamedListSelector/NamedListSelector';

class ProductSelector extends Component {

    componentDidMount() {
        this.props.fetchProducts();
    }

    onUpdateFilterString = (e) => {

        const filterString = e.target.value.toLowerCase();

        this.props.onUpdateFilterString(filterString);
    };

    addNewProduct = () => {

        const name = this.props.ui.filterString;
        let product;
        if (this.props.products[name]) {
            const config = this.props.products[name];
            product = new ProductModel({...config});
        } else {
            product = new ProductModel({name});
        }

        this.props.onAddProduct(product);
    };

    render(){
        return (
            <div>
                <AddItem
                    buttonLabel="zur Liste"
                    placeholder="neues Produkt"
                    value={this.props.ui.filterString}
                    updateValue={this.onUpdateFilterString}
                    triggerOnClick={this.addNewProduct}
                />
                <NamedListSelector
                    items={this.props.products}
                    onSelect={this.props.onAddProduct}
                />
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        ui: productSelectors.getProductUi(state),
        products: productSelectors.getSortedFilteredProductlist(state)
    }
};

const mapDispatchToProps = dispatch =>{
    return {
        fetchProducts: () => dispatch(productActions.fetchProducts()),
        onAddProduct: (product) => dispatch(productActions.startAddProduct(product)),
        onUpdateFilterString: (filterString) => dispatch(productActions.updateProductFilter(filterString)),
    }
};

ProductSelector.propTypes = {
    onSelectProduct: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductSelector);