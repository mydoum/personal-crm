import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import MenuComponent from './layout/menu/MenuComponent';
import HomeComponent from './pages/home/HomeComponent';
import ContactCreateComponent from './contact/components/ContactCreateComponent';

import './App.css';

class App extends Component {
  render() {
    return (
        <Router>
          <div id="html">
            <MenuComponent/>
            <div id="body">
              <Route exact path="/" component={HomeComponent}/>
              <Route path="/create" component={ContactCreateComponent}/>
            </div>
          </div>
        </Router>
    );
  }
}

export default App;
