import * as React from 'react';
import { Route, withRouter, RouteComponentProps } from 'react-router';
import ProductLinkCreator from './product-link-creator/product-link-creator.container';
import ProductLinkSelector from './product-link-selector';

interface Props extends RouteComponentProps<{}> { } 
const Layout: React.SFC<Props> = (props) => (
  <>
    <Route path={props.match.url} exact={true} component={ProductLinkSelector} />
    <Route path={props.match.url + '/:product'} exact={true} component={ProductLinkCreator}/>
  </>
);

export default withRouter(Layout);