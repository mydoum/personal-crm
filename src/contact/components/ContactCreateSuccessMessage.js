import React from 'react';
import {Form, Message} from 'semantic-ui-react';

export default function(props) {
  return (
      <Form success={props.success}>
        <Message
            success
            header='Contact sent'
            content="Everything is alright, you can close the window"
        />
      </Form>
  );
}