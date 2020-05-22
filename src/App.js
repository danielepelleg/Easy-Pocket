import React from 'react';

/// React Router
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import * as ROUTES from './constants/routes';
import Main from './Main.js'
import SignIn from './components/SignIn.js'
import SignUp from './components/SignUp.js'
import Home from './components/Home.js'

/// Style
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path={ROUTES.LANDING} component={Main} />
          <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
          <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
          <Route exact path={ROUTES.HOME} component={Home} />
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
