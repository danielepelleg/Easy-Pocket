import React from 'react';
<<<<<<< Updated upstream
import Home from './Home.js'
import Login from './components/Login.js'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
        </Switch>
        
      </div>
    </Router>
  );
=======
import {Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {Chart} from 'react-chartjs-2';
import {ThemeProvider} from '@material-ui/styles';
import validate from 'validate.js';


import {chartjs} from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
    draw: chartjs.draw
});

validate.validators = {
    ...validate.validators,
    ...validators
};


/// Style
//import './App.css';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router history={browserHistory}>
                <div className="App">
                        <Routes/>
                </div>
            </Router>
        </ThemeProvider>
    );
>>>>>>> Stashed changes
}

export default App;
