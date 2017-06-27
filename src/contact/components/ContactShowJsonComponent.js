import React from 'react';
import {Grid, Segment} from 'semantic-ui-react';
import PropTypes from 'prop-types';

function checkColor(status) {
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

function JsonResponse(props) {
  return (
      <div id="jsonResponse">
        <strong>JSON Response</strong>
        <pre>{JSON.stringify(props.response, null, '\t')}</pre>
      </div>
  );
}

export default function JsonResultComponent(props) {
  return (
      <Grid.Column>
        <Segment color={checkColor(props.status)}>
          {props.status}
        </Segment>
        <JsonResponse response={props.response}/>
      </Grid.Column>
  );
}

JsonResultComponent.propTypes = {
  status: PropTypes.number,
  response: PropTypes.any
};
