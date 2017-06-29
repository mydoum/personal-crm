import React, {Component} from 'react';
import {Image, Card, Icon, Modal, Button, Header } from 'semantic-ui-react';
import axios from 'axios';

import '../css/ContactComponent.css'

let moment = require('moment');

class ContactComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpened: false
    };
  }

  triggerModal = () => {
    this.setState({
      modalOpened: !this.state.modalOpened
    })
  }

  deleteEvent = (id) => {
    axios({
      method: 'delete',
      url: 'http://localhost:3001/api/contacts/' + id,
    }).then((data) => {
      console.log('element deleted', id);
    }).catch((error) => {
      console.log(error);
    });
    this.props.update()
    this.triggerModal()
  }

  render() {
    const {id, firstname, lastname, email, notes} = this.props.contact;
    const lastContactedDate = moment(this.props.contact['last-contacted']).
        format('d MMM YYYY');

    const modal = (<Modal
        open={this.state.modalOpened}
        basic
        size='small'
        onClose={this.triggerModal}>
      <Header icon='bug' content={`Delete ${firstname.toUpperCase()} ${lastname.toUpperCase()}`} />
      <Modal.Content>
        <p>This action will be irreversible, Are you sure you want to delete this contact ?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={this.triggerModal} inverted>
          <Icon name='cancel' /> No
        </Button>
        <Button type="submit" color='red' onClick={() => this.deleteEvent(id)} inverted>
          <Icon name='remove' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>)
    return (
        <Card>
          <Image
              src='https://pbs.twimg.com/profile_images/3544538383/f46cd6062bad0dcedd55228af1c29ca2.jpeg'
              label={{ as: 'b', corner: 'right', icon: 'delete', onClick: this.triggerModal}}
          />
          <Card.Content>
            <Card.Header>
              {lastname.toUpperCase()} {firstname}
            </Card.Header>
            <Card.Meta>
        <span className='date'>
          Last contacted: {lastContactedDate}
        </span>
            </Card.Meta>
            <Card.Description>
              {notes}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='mail'/>
              {email}
            </a>
          </Card.Content>
          {modal}
        </Card>
    );

  }
}

export default ContactComponent;
