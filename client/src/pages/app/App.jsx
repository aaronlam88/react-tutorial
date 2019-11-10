import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from '../home/Home';
import About from '../about/About';
import Users from '../users/Users';

// import logo from "../../images/logo.svg";
import './App.css';

const App = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about/">About</Link>
          </li>
          <li>
            <Link to="/users/">Users</Link>
          </li>
        </ul>
      </nav>

      <Route path="/" exact component={Home} />
      <Route path="/about/" component={About} />
      <Route path="/users/" component={Users} />
    </div>
  </Router>
);

export default App;
