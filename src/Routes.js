import React from 'react';
import {Switch, Redirect} from 'react-router-dom';

import {RouteWithLayout} from './components';
import {Main as MainLayout, Minimal as MinimalLayout} from './layouts';
import * as ROUTES from './constants/routes';

import {
  Home,
  SignIn,
  SignUp,
  Main
} from './components'

const Routes = ({ authUser }) => (
  <div>{authUser ? <RoutesAuth /> : <RoutesNonAuth />}</div>
);

const RoutesAuth = () => (
    <Switch>
      <Redirect
        exact
        from="/"
        to={ROUTES.HOME}
      />
      <RouteWithLayout
        exact path={ROUTES.MAIN} component={Main} layout={MinimalLayout}
      />
      <RouteWithLayout
        exact path={ROUTES.HOME} component={Home} layout={MainLayout}
      />
    </Switch>
);

const RoutesNonAuth = () => (
    <Switch>
      <Redirect
        exact
        from="/"
        to={ROUTES.MAIN}
      />
      <RouteWithLayout
        exact path={ROUTES.MAIN} component={Main} layout={MinimalLayout}
      />   
      <RouteWithLayout
        exact path={ROUTES.SIGN_UP} component={SignUp} layout={MinimalLayout}
      />
      <RouteWithLayout
        exact path={ROUTES.SIGN_IN} component={SignIn} layout={MinimalLayout}
      />
    </Switch>
);

export default Routes
