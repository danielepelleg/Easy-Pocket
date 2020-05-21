import React from 'react';
import Home from './Home.js'
import SignIn from './components/SignIn.js'
import SignUp from './components/SignUp.js'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const Navigation = () => (
<div>
    <ul>
        <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.HOME}>Home</Link>
        </li>
    </ul>
</div>
);

export default Navigation;