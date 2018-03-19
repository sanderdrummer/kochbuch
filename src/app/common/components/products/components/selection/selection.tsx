import * as React from 'react';
import ProductList from '../product-list';
import { default as SearchFormContainer } from '../../../forms/searchFrom/search-form.container';
import { Product } from '../..';
import { productUiNameSpace } from '../../store/products';
import { Api } from '../../../..';
type SelectionProps = {
    products: Product[],
    // tslint:disable-next-line:no-any
    addProduct(title: string): any,
    // tslint:disable-next-line:no-any
    setProducts(products: any): any
};

export default class Selection extends React.Component<SelectionProps, {}> {

  componentDidMount() {
    if (!this.props.products.length) {
      Api.get('product').then(products => {
        // tslint:disable-next-line:no-console
        console.log(products);
        this.props.setProducts(products);
      });
    }
  }

  handleSubmit = (query: string) => {
      if (!this.props.products[query]) {
          this.props.addProduct(query);
      }
  }

  handleSelection = (product: Product) => {
      // tslint:disable-next-line:no-console
      console.log(product);
  }

  render() {
      return (
      <div>
          Product List
          <SearchFormContainer onSubmit={this.handleSubmit} reducerName={productUiNameSpace} />
          <ProductList onSelect={this.handleSelection} products={this.props.products} />
      </div>);
  }
}