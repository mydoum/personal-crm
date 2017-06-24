import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import MenuComponent from './layout/menu/MenuComponent';
import HomeComponent from './pages/home/HomeComponent';
import CreateContactComponent from './pages/create/CreateContactComponent';

import './App.css';

class App extends Component {
  render() {
    return (
        <Router>
          <div id="html">
            <MenuComponent/>
            <div id="body">
              <Route exact path="/" component={HomeComponent}/>
              <Route path="/create" component={CreateContactComponent}/>
            </div>
          </div>
        </Router>
    );
  }
}

export default App;
