import React from 'react';
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
}

export default App;
