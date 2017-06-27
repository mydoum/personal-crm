import React, {Component} from 'react';
import { Form, TextArea, Button, Grid, Segment, Input, Select } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';

import MessageSuccess from './ContactCreateSuccessMessage'
import JsonResultComponent from './ContactShowJsonComponent'

import 'react-datepicker/dist/react-datepicker.css';
import '../css/ContactCreateComponent.css';

const options = [
  {key: 'm', text: 'Male', value: 'male'},
  {key: 'f', text: 'Female', value: 'female'},
];

class CreateContactComponent extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        firstname: 'a',
        lastname: 'a',
        email: '',
        'phone-number': '',
        notes: '',
        birthday: null,
        'last-contacted': null,
        'creation-date': null
      },
      created: false,
      sent: false,
      status: 0,
      response: {},
    };
  }

  handleChange = (e, {name, value}) => {
    const data = {...this.state.data};
    data[name] = value;
    this.setState({data: data});
  };

  genericDateHandleChange(date, label) {
    const data = {...this.state.data};
    data[label] = date;
    this.setState({
      data: data
    });
  }

  sendContact = () => {
    this.setState({sent: true});
    axios({
      method: 'post',
      url: 'http://localhost:3001/api/contacts',
      data: this.state.data,
    }).then((data) => {
      this.setState({created: true, status: data.status, response: data.data});
      console.log(data);
    }).catch((error) => {
      console.log(error);
      this.setState({
        created: false,
        status: error.response.status,
        response: error.response.data,
      });
    });
  };

  render() {
    const jsonResult = (this.state.sent) ? (
        <JsonResultComponent status={this.state.status} response={this.state.response}/>
    ) : null;

    const formElements = [
      {control: Input, label: 'First name', name: 'firstname', required: true},
      {control: Input, label: 'Last name', name: 'lastname', required: true},
      {control: Select, label: 'Gender', name: 'gender', options: options},
      {control: Input, label: 'Email', name: 'email'},
      {control: Input, label: 'Phone', name: 'phone'},
      {control: TextArea, label: 'notes', name: 'notes', placeholder: 'Tell us more about this contact...'}
    ].map(element => <Form.Field
        key={element.label}
        control={element.control}
        label={element.label}
        placeholder={(element.placeholder) ? element.placeholder: element.label}
        name={element.name}
        value={this.state.data[element.name]}
        required={(element.required) ? element.required : false}
        options={(element.options) ? element.options: ''}
        onChange={this.handleChange}
    />)

    let counter = 0
    const formResult = [3, 2, 1].map(rate => {
      const oldCounter = counter
      counter += rate
      return <Form.Group key={oldCounter + (oldCounter + rate)} widths='equal'>{formElements.slice(oldCounter, oldCounter + rate)}</Form.Group>
    })

    const formDates = [
      {label: 'Birthday', onChange: this.birthdayDateHandleChange, selected: 'birthday'},
      {label: 'Creation Date', onChange: this.creationDateHandleChange, selected: 'creation-date'},
      {label: 'Last Contacted', onChange: this.lastContactedDateHandleChange, selected: 'last-contacted'}
    ].map(dateElement =>
        <Form.Field key={dateElement.label}>
          <label>{dateElement.label}</label>

          <DatePicker
              selected={this.state.data[dateElement.selected]}
              openToDate={moment("1990-01-01")}
              onChange={(date) => this.genericDateHandleChange(date, dateElement.selected)}
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
        <div>
          <Form>
            {formResult}
            <Form.Group widths="equal">
              {formDates}
            </Form.Group>
          </Form>
          <MessageSuccess success={this.state.created}/>
          <div id="formButton">
            <Button onClick={this.sendContact}>Submit</Button>
          </div>
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column>
                <div id="json">
                  <strong>JSON Request type : POST</strong>
                  <pre>{JSON.stringify(this.state.data, null, '\t')}</pre>
                </div>
              </Grid.Column>
              {jsonResult}
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

export default CreateContactComponent;