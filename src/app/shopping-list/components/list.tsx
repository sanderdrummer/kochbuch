import * as React from 'react';
import { ADD_ROUTE } from './layout';
import { Link } from 'react-router-dom';
import ListProducts from './list-products';
import { ProductLink } from '../../common';
import { Props } from './list.container';

class List extends React.Component<Props, object> {

  componentDidMount() {
    this.props.fetchProducts();

  }

  handleSelect = (product: ProductLink) => {
    this.props.toggleIsActive(product);
  }

  clearActiveItems = () => {
    const ids = this.props.activeProducts.map((product: ProductLink) => product.id);
    this.props.clearList(ids);
  }

  render () {
    return (
      <div>
        <Link to={ADD_ROUTE}>+</Link>
        <ListProducts products={this.props.inActiveProducts} onSelect={this.handleSelect} />
        <hr/>
        <ListProducts products={this.props.activeProducts} onSelect={this.handleSelect} />
        <button onClick={this.clearActiveItems}>clear</button>
      </div>
    );
  }
}

export default List;