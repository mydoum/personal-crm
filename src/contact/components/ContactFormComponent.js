import React, { Component } from 'react';
import { Form, Input, Select, TextArea } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const options = [
  {key: 'm', text: 'Male', value: 'male'},
  {key: 'f', text: 'Female', value: 'female'},
];

class ContactFormElementComponent extends Component {

  render() {
    console.log(this.props.data)
    const formElements = [
      {control: Input, label: 'First name', name: 'firstname', required: true},
      {control: Input, label: 'Last name', name: 'lastname', required: true},
      {control: Select, label: 'Gender', name: 'gender', options: options},
      {control: Input, label: 'Email', name: 'email'},
      {control: Input, label: 'Phone', name: 'phone'},
      {
        control: TextArea,
        label: 'notes',
        name: 'notes',
        placeholder: 'Tell us more about this contact...'
      }
    ].map(element => <Form.Field
        key={element.label}
        control={element.control}
        label={element.label}
        placeholder={(element.placeholder) ? element.placeholder : element.label}
        name={element.name}
        value={this.props.data[element.name]}
        required={(element.required) ? element.required : false}
        options={(element.options) ? element.options : ''}
        onChange={this.props.onChange}
    />)

    let counter = 0
    const formResult = [3, 2, 1].map(rate => {
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

class ContactFormDateComponent extends Component {
  render() {
    const formDates = [
      {label: 'Birthday', selected: 'birthday'},
      {label: 'Creation Date', selected: 'creation-date'},
      {label: 'Last Contacted', selected: 'last-contacted'},
    ].map(dateElement =>
        <Form.Field key={dateElement.label}>
          <label>{dateElement.label}</label>

          <DatePicker
              selected={this.props.data[dateElement.selected]}
              openToDate={moment('1990-01-01')}
              onChange={(date) => this.props.onChange(date, dateElement.selected)}
              dateFormatCalendar="D MMMM YYYY"
              dateFormat="D MMMM YYYY"
              showYearDropdown={true}
              dropdownMode="select"
              peekNextMonth
              showMonthDropdown
              placeholderText="Date here..."
              locale="en-gb"
              isClearable={true}
          />
        </Form.Field>
    )
    return (
        <Form.Group widths="equal">
          {formDates}
        </Form.Group>
    )
  }
}

class ContactFormComponent extends Component {
  render() {
    return (
        <Form>
          <ContactFormElementComponent data={this.props.data} onChange={this.props.onChange}/>
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
