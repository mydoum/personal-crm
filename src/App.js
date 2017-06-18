import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import MenuComponent from './layout/menu/MenuComponent'
//import SidebarComponent from './layout/sidebar/SidebarComponent'
import ContactContainer from './contact/containers/ContactContainer';

class App extends Component {
  render() {
    return (
        <div className="App">
          <MenuComponent/>
          <ContactContainer/>
        </div>
    );
  }
}

export default App;
