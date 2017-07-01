import { Form, Input, Select, TextArea } from 'semantic-ui-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const options = [
  {key: 'm', text: 'Male', value: 'male'},
  {key: 'f', text: 'Female', value: 'female'},
];

class ContactFormElementComponent extends Component {

  render() {
    const formElements = [
      {control: Input, label: 'First name', name: 'firstname', required: true},
      {control: Input, label: 'Last name', name: 'lastname', required: true},
      {control: Select, label: 'Gender', name: 'gender', options: options},
      {control: Input, label: 'Email', name: 'email'},
      {control: Input, label: 'Phone', name: 'phone-number'},
      {control: TextArea, label: 'notes', name: 'notes', placeholder: 'Tell us more about this contact...'}
    ].map(element => {
      const params = {
        key: element.label,
        control: element.control,
        label: element.label,
        placeholder: element.placeholder || element.label,
        name: element.name,
        value: this.props.data[element.name],
        required: element.required || false,
        onChange: this.props.onChange
      }
      const fieldParams = element.options ? {...params, options: element.options} : params

      return <Form.Field {...fieldParams} />;
    })

    let counter = 0
    const formResult = (!this.props.slice) ? <div>{formElements}</div> : this.props.slice.map(rate => {
      const oldCounter = counter
      counter += rate
      return <Form.Group key={oldCounter + (oldCounter + rate)}
                         widths='equal'>{formElements.slice(oldCounter,
          oldCounter + rate)}</Form.Group>
    })

    return (
        <div>
          {formResult}
        </div>)
  }
}

export default ContactFormElementComponent

ContactFormElementComponent.propTypes = {
  data: PropTypes.object,
  slice: PropTypes.array,
  onChange: PropTypes.func
}
