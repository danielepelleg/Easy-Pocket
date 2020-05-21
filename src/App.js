import React from 'react';
import Home from './Home.js'
import SignIn from './components/SignIn.js'
import SignUp from './components/SignUp.js'
import Main from './components/Main.js'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import * as ROUTES from './constants/routes';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path={ROUTES.LANDING} component={Home} />
          <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
          <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
          <Route exact path={ROUTES.MAIN} component={Main} />
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
