import React, {Component} from 'react';
import axios from 'axios';
import { Card } from 'semantic-ui-react';

import ContactDisplayComponent from '../components/ContactDisplayComponent'

class ContactGetContainer extends Component {
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
        <ContactDisplayComponent
            key={contact.id}
            trigger={this.triggerModal}
            contact={contact}
            update={this.update}/>)
    return <Card.Group>{result}</Card.Group>
  }
}

export default ContactGetContainer;
