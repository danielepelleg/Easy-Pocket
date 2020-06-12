import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Route a page with a standard layout
 * 
 * @param {layout} props | the layout to route with
 */

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;
