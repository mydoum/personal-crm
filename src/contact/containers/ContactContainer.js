import React, {Component} from 'react';
import axios from 'axios';
import { Card } from 'semantic-ui-react';

import ContactComponent from '../components/ContactComponent'

class ContactContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
      modalOpened: false,
    };
  }

  componentWillMount() {
    this.ContactList();
  }

  update = () => {
    console.log('contactContainer updated!');
    this.componentWillMount()
  }

  ContactList() {
    axios({
      method:'get',
      url:'http://localhost:3001/api/contacts',
    })
    .then((data) => {
      this.setState({
        contacts: data.data,
      });
    }).catch(function (error) {
      console.log(error);
    });
  }
  render() {
    const result = this.state.contacts.map(contact =>
        <ContactComponent
            key={contact.id}
            trigger={this.triggerModal}
            contact={contact}
            update={this.update}/>)
    return <Card.Group>{result}</Card.Group>
  }
}

export default ContactContainer;
