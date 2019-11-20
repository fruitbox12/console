import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import Styles from './Styles';
import { renderTextField } from '../../../components';
import validate from './Validation';

export const CreateEdgeClusterView = ({ handleSubmit, pristine, submitting, reset, onCancelButtonClick }) => {
  const classes = Styles();

  return (
    <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Container>
        <Field name="name" label="Name" component={renderTextField} />
      </Container>
      <Container>
        <Field name="clusterSecret" label="Secret" component={renderTextField} />
      </Container>
      <Container>
        <Button type="submit" disabled={pristine || submitting} color="primary">
          Create
        </Button>
        <Button type="button" disabled={pristine || submitting} onClick={reset} color="secondary">
          Reset
        </Button>
        <Button type="button" disabled={submitting} onClick={onCancelButtonClick} color="secondary">
          Cancel
        </Button>
      </Container>
    </form>
  );
};

CreateEdgeClusterView.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'CreateEdgeClusterForm',
  validate,
})(CreateEdgeClusterView);
