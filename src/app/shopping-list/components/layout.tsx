import * as React from 'react';
import { SFC } from 'react';
import List from './list.container';
import { ProductLinkLayout } from '../../common';
import { Switch, Route, withRouter } from 'react-router';

export const ADD_ROUTE = 'add';

// tslint:disable-next-line:no-any
const Layout: SFC<any> = (props) => (
  <div>
    <Switch>
      <Route path={props.match.url} exact={true} component={List} />
      <Route path={props.match.url + ADD_ROUTE} component={ProductLinkLayout} />
    </Switch>
  </div>

);

export default withRouter(Layout);