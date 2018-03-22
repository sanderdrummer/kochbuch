import * as React from 'react';
import ProductList from '../product-list';
import { Product } from '../..';
import { productUiNameSpace } from '../../store/products';
import { SearchForm, Card } from '../../../..';

type SelectionProps = {
  products: Product[],
  // tslint:disable-next-line:no-any
  addProduct(title: string): any,
  fetchProducts(): void,
  handleSelection(product: Product): void
};

export default class Selection extends React.Component<SelectionProps, {}> {

  componentDidMount() {
    if (!this.props.products.length) {
      this.props.fetchProducts();
    }
  }

  handleSubmit = (query: string) => {
    if (!this.props.products[query]) {
        this.props.addProduct(query).then((product: Product) => {
        this.props.handleSelection({ id: query, popularity: 0 });
      });
    } else {
      this.props.handleSelection(this.props.products[query]);      
    }
  }

  handleSelection = (product: Product) => {
    this.props.handleSelection(product);
  }

  render() {
      return (
      <>
        <SearchForm
          label="add product"
          placeholder="search products"
          state="products"
          onSubmit={this.handleSubmit}
          reducerName={productUiNameSpace}
        />
        <Card level={2}>
          <ProductList onSelect={this.handleSelection} products={this.props.products} />
        </Card>
      </>);
  }
}