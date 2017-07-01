import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, Image, Input, Form, Button} from 'semantic-ui-react';
import axios from 'axios'

import ContactFormDateComponent from './ContactFormDateComponent'
import ContactFormElementComponent from './ContactFormElementComponent'

function modifyContact(id, data) {
  return axios({
    method: 'put',
    url: 'http://localhost:3001/api/contacts/' + id,
    data: data
  }).catch((error) => {
    console.log(error);
  })
}

class ContactModifyCardComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {...this.props.contact},
    };
  }

  modifyEvent = (data) => {
    modifyContact(data.id, data).then(() => {
      this.props.update()
      this.props.triggerModification()
    })
  }

  genericDateHandleChange = (date, label) => {
    const data = {...this.state.data, [label]: date};
    this.setState({data});
  }

  handleChange = (e, {name, value}) => {
    const data = {...this.state.data, [name]: value};
    this.setState({data});
  };

  render() {
    return (
        <div>
          <Card>
            <Image
                src='https://pbs.twimg.com/profile_images/3544538383/f46cd6062bad0dcedd55228af1c29ca2.jpeg'/>
            <Card.Content>
              <Form>
                <Card.Header>
                  <ContactFormElementComponent data={this.state.data} onChange={this.handleChange}/>
                  <ContactFormDateComponent onChange={this.genericDateHandleChange} data={this.state.data}/>
                </Card.Header>
              </Form>
            </Card.Content>
          </Card>
          <Button.Group>
            <Button negative onClick={this.props.triggerModification}>Cancel</Button>
            <Button.Or />
            <Button positive onClick={() => this.modifyEvent(this.state.data)}>Modify</Button>
          </Button.Group>
        </div>
    );
  }
}

export default ContactModifyCardComponent;

ContactModifyCardComponent.propTypes = {
  contact: PropTypes.any,
  triggerModification: PropTypes.any,
  update: PropTypes.any
};
