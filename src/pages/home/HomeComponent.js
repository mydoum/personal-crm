import React, {Component} from 'react';
import ContactGetContainer from '../../contact/containers/ContactGetContainer';

import '../css/HomeComponent.css'

class Home extends Component {
  render() {
    return (
        <div className="home">
          <ContactGetContainer/>
        </div>
    );
  }
}

export default Home;
