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
  Account
} from './components'



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
        exact path={ROUTES.ACCOUNT} component={Account} layout={MinimalLayout}
      />


    </Switch>
);
export default Routes
