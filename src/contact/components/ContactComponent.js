import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import ContactDisplayCardComponent from './ContactDisplayCardComponent'
import ContactDeleteModalComponent from './ContactDeleteModalComponent'

import '../css/ContactComponent.css'


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

  render() {
    return (
        <div>
          <ContactDisplayCardComponent contact={this.props.contact} triggerModal={this.triggerModal}/>
          <ContactDeleteModalComponent update={this.props.update} contact={this.props.contact} triggerModal={this.triggerModal} modalOpened={this.state.modalOpened}/>
        </div>
    );

  }
}

export default ContactComponent;

ContactComponent.propTypes = {
  contact: PropTypes.any
}