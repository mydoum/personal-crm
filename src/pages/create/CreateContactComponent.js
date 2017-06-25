import React, {Component} from 'react';
import {
  Form,
  TextArea,
  Button,
  Message,
  Grid,
  Segment,
} from 'semantic-ui-react';
import axios from 'axios';

import './CreateContactComponent.css';

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
  )
}

class CreateContactComponent extends Component {
  state = {
    data: {
      firstname: 'a',
      lastname: 'a',
      email: '',
      "phone-number": '',
      notes: ''
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
      this.setState({created: false, status: error.response.status, response: error.response.data});
    });
  };

  checkColor = (status) => {
    var color = 'red'
    switch(status) {
      case 200:
        color = 'green'
        break;
      default:
        color = 'red'
        break;
    }
    return color
  }

  render() {
    const {firstname, lastname, email, notes} = this.state.data;
    const jsonResult = (this.state.sent) ? (
        <Grid.Column>
          <Segment color={this.checkColor(this.state.status)}>{this.state.status}</Segment>
          <JsonResponse response={this.state.response}/>
        </Grid.Column>
    ) : null
    return (
        <div>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input label='First name' name="firstname" value={firstname}
                          placeholder='First name' required
                          onChange={this.handleChange}/>
              <Form.Input label='Last name' name="lastname" value={lastname}
                          placeholder='Last name' required
                          onChange={this.handleChange}/>
              <Form.Select label='Gender' options={options}
                           placeholder='Gender'/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input label='Email' name="email" value={email}
                          placeholder='Email'
                          onChange={this.handleChange}/>

              <Form.Input label='Phone' name="phone-number" value={this.state.data["phone-number"]}
                          placeholder='Phone'
                          onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field control={TextArea} label='notes' name="notes" value={notes}
                          placeholder='Tell us more about this contact...'/>
            </Form.Group>
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
