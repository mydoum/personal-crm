import React, {Component} from 'react';
import axios from 'axios';
import { Icon, Modal, Button, Header } from 'semantic-ui-react';

function deleteContact(id) {
  return axios({
    method: 'delete',
    url: 'http://localhost:3001/api/contacts/' + id,
  }).catch((error) => {
    console.log(error);
  })
}

class ContactDeleteModalComponent extends Component {
  deleteEvent = (id) => {
    deleteContact(id).then(() => {
      this.props.update()
      this.props.triggerModal
    })
  }

  render() {
    const { id, firstname, lastname } = this.props.contact
    return (
        <Modal
            open={this.props.modalOpened}
            basic
            size='small'
            onClose={this.props.triggerModal}>
          <Header icon='bug' content={`Delete ${firstname.toUpperCase()} ${lastname.toUpperCase()}`} />
          <Modal.Content>
            <p>This action will be irreversible, Are you sure you want to delete this contact ?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' onClick={this.props.triggerModal} inverted>
              <Icon name='cancel' /> No
            </Button>
            <Button type="submit" color='red' onClick={() => this.deleteEvent(id)} inverted>
              <Icon name='remove' /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
    )
  }
}

export default ContactDeleteModalComponent