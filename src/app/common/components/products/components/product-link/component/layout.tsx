import * as React from 'react';
import { Route, withRouter } from 'react-router';
import ProductLinkCreator from './product-link-creator';
import ProductLinkSelector from './product-link-selector';

// tslint:disable-next-line:no-any
const Layout: React.SFC<any> = (props) => (
  <>
    <Route path={props.match.url} exact={true} component={ProductLinkSelector} />
    <Route path={props.match.url + ':product'} exact={true} component={ProductLinkCreator}/>
  </>
);

export default withRouter(Layout);