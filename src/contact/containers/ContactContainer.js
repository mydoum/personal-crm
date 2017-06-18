import React, {Component} from 'react';
import axios from 'axios';
import { Card } from 'semantic-ui-react'

import ContactComponent from '../components/ContactComponent'

class ContactContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {contacts: []};
  }

  componentDidMount() {
    this.ContactList();
  }

  ContactList() {
    axios({
      method:'get',
      url:'http://localhost:3001/api/contacts',
    })
    .then((data) => {
      this.setState({ contacts: data.data });
    }).catch(function (error) {
      console.log(error);
    });
  }
  render() {
    const result = this.state.contacts.map(contact => <ContactComponent key={contact.firstname + ':' + contact.lastname} contact={contact}/>)
    return <Card.Group>{result}</Card.Group>;
  }
}

export default ContactContainer;
