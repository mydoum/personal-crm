import React, {Component} from 'react';
import { Form, Button, Grid } from 'semantic-ui-react';
import axios from 'axios';

import ContactObj from './ContactObject'
import MessageSuccess from './ContactCreateSuccessMessage'
import JsonResultComponent from './ContactShowJsonComponent'
import ContactFormComponent from './ContactFormComponent'

import 'react-datepicker/dist/react-datepicker.css';
import '../css/ContactCreateComponent.css';


class CreateContactComponent extends Component {
  constructor() {
    super();
    this.state = {
      data: {...ContactObj},
      created: false,
      sent: false,
      status: 0,
      response: {},
    };

    this.genericDateHandleChange = this.genericDateHandleChange.bind(this)
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

    return (
        <div>
          <Form>
            <ContactFormComponent data={this.state.data} onChange={this.handleChange} dateOnChange={this.genericDateHandleChange}/>
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