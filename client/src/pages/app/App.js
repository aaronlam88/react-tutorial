import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ErrorBoundary from '../../components/error-boundary/ErrorBoundary';

import Login from '../login/Login';
import About from '../about/About';
import Users from '../users/Users';
import ErrorPage from '../error-page/ErrorPage';

// import logo from "../../images/logo.svg";
import './App.css';

const App = () => (
  <ErrorBoundary>
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
        <Route path="/error" component={ErrorPage} />
      </Switch>
    </Router>
  </ErrorBoundary>
);

export default App;
