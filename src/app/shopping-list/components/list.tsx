import * as React from 'react';
import { ADD_ROUTE } from './layout';
import { Link } from 'react-router-dom';
import ListProducts from './list-products';
import { ProductLink, Card, linkStyle, hoverButton } from '../../common';
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
      <>
        <Card level={2}>
          <Link className={linkStyle} to={ADD_ROUTE}>Shopping List +</Link>        
        </Card>
        <Card level={2}>
          <p>Add to basket</p>
          <ListProducts products={this.props.inActiveProducts} onSelect={this.handleSelect} />
        </Card>
        <Card level={2}>
          <p>Already in basket</p>
          <ListProducts products={this.props.activeProducts} onSelect={this.handleSelect} />
        </Card>
        <button className={hoverButton} onClick={this.clearActiveItems}>clear</button>
      </>
    );
  }
}

export default List;