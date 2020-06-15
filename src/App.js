import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Chart } from "react-chartjs-2";
import { ThemeProvider } from "@material-ui/styles";
import validate from "validate.js";
import { chartjs } from "./helpers";
import theme from "./theme";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./assets/scss/index.scss";
import validators from "./common/validators";
import Routes from "./Routes";

/**
 *  *** Session Handling Imports ***
 * Use the new context to provide the authenticated user to components that are interested in it.
 * 
 * withAuthentication now passes the authenticated user implicitly via React's Context, 
 * rather than explicitly through the component tree using props.
 */
import { withAuthentication } from "components/Session";

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw,
});

validate.validators = {
  ...validate.validators,
  ...validators,
};

/**
 * Since our application is made under the umbrella of App component,
 * it's sufficient to manage the session state in the App component using React's local state.
 *
 * The App component only needs to keep track of an authenticated user (session). If a user is authenticated,
 * store it in the local state and pass the authenticated user object down to all components that are interested in it.
 * Otherwise, pass the authenticated user down as null. That way, all components interested in it can adjust their behavior
 * (e.g. use conditional rendering) based on the session state.
 */
const App = () => (
  <ThemeProvider theme={theme}>
    <Router history={browserHistory}>
      <div className="App">
        <Routes />
      </div>
    </Router>
  </ThemeProvider>
);

export default withAuthentication(App);
