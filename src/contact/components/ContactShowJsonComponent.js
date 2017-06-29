import React from 'react';
import {Grid, Segment} from 'semantic-ui-react';
import PropTypes from 'prop-types';

function getColorStatus(status) {
  return (status === 200) ? 'green' : 'red';
};

function JsonResponse(props) {
  return (
      <div id="jsonResponse">
        <strong>JSON Response</strong>
        <pre>{JSON.stringify(props.response, null, '\t')}</pre>
      </div>
  );
}

function JsonResultComponent(props) {
  return (
      <Grid.Column>
        <Segment color={getColorStatus(props.status)}>
          {props.status}
        </Segment>
        <JsonResponse response={props.response}/>
      </Grid.Column>
  );
}

function JsonCreateComponent(props) {
  return (
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <div id="json">
              <strong>JSON Request type : POST</strong>
              <pre>{JSON.stringify(props.data, null, '\t')}</pre>
            </div>
          </Grid.Column>
          {(props.sent) ? <JsonResultComponent status={props.status} response={props.response}/>: null}
        </Grid.Row>
      </Grid>
  );
}

export default JsonCreateComponent;

JsonResultComponent.propTypes = {
  status: PropTypes.number,
  response: PropTypes.any,
  sent: PropTypes.boolean,
  data: PropTypes.any,
};
