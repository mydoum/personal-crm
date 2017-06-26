import React, {Component} from 'react';
import { Form, TextArea, Button, Message, Grid, Segment, Input, Select } from 'semantic-ui-react';
import axios from 'axios';

import '../css/ContactCreateComponent.css';

const options = [
  {key: 'm', text: 'Male', value: 'male'},
  {key: 'f', text: 'Female', value: 'female'},
];

function JsonResponse(props) {
  return (
      <div id="jsonResponse">
        <strong>JSON Response</strong>
        <pre>{JSON.stringify(props.response, null, '\t')}</pre>
      </div>
  );
}

class CreateContactComponent extends Component {
  state = {
    data: {
      firstname: 'a',
      lastname: 'a',
      email: '',
      'phone-number': '',
      notes: '',
    },
    created: false,
    sent: false,
    status: 0,
    response: {},
  };

  handleChange = (e, {name, value}) => {
    const data = {...this.state.data};
    data[name] = value;
    this.setState({data: data});
  };

  optionHandleChange = (e, {options, name}) => {
    console.log(options.value, name)
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

  checkColor = (status) => {
    var color = 'red';
    switch (status) {
      case 200:
        color = 'green';
        break;
      default:
        color = 'red';
        break;
    }
    return color;
  };

  render() {
    const {firstname, lastname, email, notes} = this.state.data;
    const jsonResult = (this.state.sent) ? (
        <Grid.Column>
          <Segment color={this.checkColor(
              this.state.status)}>{this.state.status}</Segment>
          <JsonResponse response={this.state.response}/>
        </Grid.Column>
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
        options={(element.options) ? element.options: null}
        onChange={this.handleChange}
    />)

    let counter = 0
    const formResult = [3, 2, 1].map(rate => {
      const oldCounter = counter
      counter += rate
      return <Form.Group key={oldCounter + (oldCounter + rate)} widths='equal'>{formElements.slice(oldCounter, oldCounter + rate)}</Form.Group>
    })

    return (
        <div>
          <Form>
              {formResult}
          </Form>
          <Form success={this.state.created}>
            <Message
                success
                header='Contact sent'
                content="Everything is alright, you can close the window"
            />
          </Form>
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
