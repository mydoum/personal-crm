import React, { Component } from 'react';
import { Card, Label, Image, Icon } from 'semantic-ui-react'

import '../css/ContactComponent.css'

let moment = require('moment');


class ContactCardComponent extends Component {

  render() {
    const { firstname, lastname, email, notes, 'last-contacted': lastContacted, 'phone-numer': phoneNumber} = this.props.contact;
    const lastContactedDate = moment(lastContacted).format('d MMM YYYY');
    return (
        <div className="card">
          <Card>
            <Label as='b' icon='pencil' corner='left'
                   onClick={this.props.triggerModal}/>
            <Label as='b' corner='right' icon='delete'
                   onClick={this.props.triggerModal}/>
            <Image
                src='https://pbs.twimg.com/profile_images/3544538383/f46cd6062bad0dcedd55228af1c29ca2.jpeg'/>
            <Card.Content>
              <Card.Header>
                {lastname.toUpperCase()} {firstname}
              </Card.Header>

              <Card.Meta>
                <span
                    className='date'> Last contacted: {lastContactedDate} </span>
              </Card.Meta>

              <Card.Description>
                {notes}
              </Card.Description>
            </Card.Content>

            <Card.Content extra className="card-extra">
              {(email !== '') ?
                  <div><a> <Icon size='large' name='mail'/> {email} </a> <br/>
                  </div> : null}
              {(this.props.contact['phone-number']) ? <div>
                <Icon size='large' name='phone square'/> {phoneNumber}
              </div> : null}
            </Card.Content>
          </Card>
        </div>
    )}
}

export default ContactCardComponent
