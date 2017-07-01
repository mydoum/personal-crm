import DatePicker from 'react-datepicker';
import React, { Component } from 'react';
import { Form } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import moment from 'moment';

class ContactFormDateComponent extends Component {
  render() {
    const formDates = [
      {label: 'Birthday', selected: 'birthday', openToDate: moment('1990-01-01')},
      {label: 'Creation', selected: 'creation-date', openToDate: moment()},
      {label: 'Contacted', selected: 'last-contacted', openToDate: moment()},
    ].map(dateElement =>
        <Form.Field key={dateElement.label}>
          <label>{dateElement.label}</label>
          <DatePicker
              selected={this.props.data[dateElement.selected] ? moment(this.props.data[dateElement.selected]) : null}
              openToDate={dateElement.openToDate}
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

    return <Form.Group widths='equal'>{formDates}</Form.Group>
  }
}

export default ContactFormDateComponent

ContactFormDateComponent.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  areInline: PropTypes.bool
}
