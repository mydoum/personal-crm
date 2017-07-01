import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ContactDisplayCardComponent from './ContactDisplayCardComponent'
import ContactModifyCardComponent from './ContactModifyCardComponent'
import ContactDeleteModalComponent from './ContactDeleteModalComponent'

import '../css/ContactComponent.css'


class ContactDisplayComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpened: false,
      modify: false
    };
  }

  triggerModal = () => {
    this.setState({
      modalOpened: !this.state.modalOpened
    })
  }

  triggerModification = () => {
    console.log('triggered');
    this.setState({
      modify: !this.state.modify
    })
  }

  render() {
    return (
        <div>
          {
            this.state.modify ? <ContactModifyCardComponent update={this.props.update} contact={this.props.contact} triggerModification={this.triggerModification}/>
              : <ContactDisplayCardComponent contact={this.props.contact} triggerModal={this.triggerModal} triggerModification={this.triggerModification}/>
          }
          <ContactDeleteModalComponent update={this.props.update} contact={this.props.contact} triggerModal={this.triggerModal} modalOpened={this.state.modalOpened}/>
        </div>
    );

  }
}

export default ContactDisplayComponent;

ContactDisplayComponent.propTypes = {
  contact: PropTypes.any
}