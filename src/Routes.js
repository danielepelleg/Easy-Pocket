import React from 'react';
import {Switch, Redirect} from 'react-router-dom';

import {RouteWithLayout} from './components';
import {Main as MainLayout, Minimal as MinimalLayout} from './layouts';
import * as ROUTES from './constants/routes';

import {
  Home,
  SignUp,
  Main,
  Login,

} from './components'

import {
  Account,
  Dashboard,
  Cards,
  Purchases,
  Quotes,
  Credits
} from './views'



const Routes = () => (
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
        exact path={ROUTES.HOME} component={Home} layout={MainLayout}
      />
      <RouteWithLayout
        exact path={ROUTES.MAIN} component={Main} layout={MinimalLayout}
      />   
      <RouteWithLayout
        exact path={ROUTES.SIGN_UP} component={SignUp} layout={MinimalLayout}
      />
      <RouteWithLayout
        exact path={ROUTES.SIGN_IN} component={Login} layout={MinimalLayout}
      />
      <RouteWithLayout
        exact path={ROUTES.CARDS} component={Cards} layout={MainLayout}
      />
      <RouteWithLayout
        exact path={ROUTES.PURCHASES} component={Purchases} layout={MainLayout}
      />
      <RouteWithLayout
        exact path={ROUTES.ACCOUNT} component={Account} layout={MainLayout}
      />
      <RouteWithLayout
        exact path={ROUTES.DASHBOARD} component={Dashboard} layout={MainLayout}
      />
      <RouteWithLayout
        exact path={ROUTES.QUOTES} component={Quotes} layout={MainLayout}
      />
      <RouteWithLayout
        exact path={ROUTES.CREDITS} component={Credits} layout={MainLayout}
      />
    </Switch>
);
export default Routes
