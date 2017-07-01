import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import ContactFormDateComponent from './ContactFormDateComponent'
import ContactFormElementComponent from './ContactFormElementComponent'


class ContactFormComponent extends Component {
  render() {
    return (
        <Form>
          <ContactFormElementComponent data={this.props.data} slice={[3, 2, 1]} onChange={this.props.onChange}/>
          <ContactFormDateComponent data={this.props.data} onChange={this.props.dateOnChange}/>
        </Form>
    )
  }
}

export default ContactFormComponent

ContactFormComponent.propTypes = {
  data: PropTypes.any,
  onChange: PropTypes.any,
  dateOnChange: PropTypes.any
};
