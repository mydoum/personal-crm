import React, {Component} from 'react';
import {Card, Icon, Image} from 'semantic-ui-react';

let moment = require('moment');

class ClientComponent extends Component {

  render() {
    const {firstname, lastname, email, notes} = this.props.contact;
    const lastContactedDate = moment(this.props.contact['last-contacted']).
        format('d MMM YYYY');

    return (
        <Card>
          <Image
              src='https://pbs.twimg.com/profile_images/3544538383/f46cd6062bad0dcedd55228af1c29ca2.jpeg'/>
          <Card.Content>
            <Card.Header>
              {lastname.toUpperCase()} {firstname}
            </Card.Header>
            <Card.Meta>
        <span className='date'>
          Last contacted: {lastContactedDate}
        </span>
            </Card.Meta>
            <Card.Description>
              {notes}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='mail'/>
              {email}
            </a>
          </Card.Content>
        </Card>
    );

  }
}

export default ClientComponent;
