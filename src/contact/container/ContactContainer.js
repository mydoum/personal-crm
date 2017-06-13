import React, {Component} from 'react';
import axios from 'axios';

class ClientContainer extends Component {
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
      console.log(data)
      this.setState({ contacts: data.data });
    }).catch(function (error) {
      console.log(error);
    });
  }
  render() {
    const result = this.state.contacts.map(contact => <div key={contact.firstname}>{contact.firstname}, {contact.lastname}</div>)
    return <div>{result}</div>;
  }
}

export default ClientContainer;
