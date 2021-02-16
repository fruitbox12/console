import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { Form, Field } from 'react-final-form';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withTranslation, WithTranslation } from 'react-i18next';

import { SetEdgeClusterView_edgeCluster } from './__generated__/SetEdgeClusterView_edgeCluster.graphql';
import styles from './Styles';
import { renderTextField, renderAutocomplete } from '../../../common/react-final-form-components';

export interface Values {
  name?: string;
  type?: string;
  secret?: string;
}

interface SetEdgeClusterViewProps extends WithTranslation {
  edgeCluster?: SetEdgeClusterView_edgeCluster;
  onCancelButtonClick: () => void;
  onSubmit: (values: Values) => void;
}

const requiredValidation = (value: string) => (value && value.trim() ? undefined : 'Required');

const SetEdgeClusterView: React.FC<SetEdgeClusterViewProps> = ({ t, onSubmit, onCancelButtonClick, edgeCluster }) => {
  const classes = styles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {edgeCluster ? t('updateEdgeCluster.title') : t('createEdgeCluster.title')}
        </Typography>
        <Form
          onSubmit={onSubmit}
          initialValues={{
            name: edgeCluster ? edgeCluster.name : '',
            type: edgeCluster ? edgeCluster.clusterType : '',
            secret: edgeCluster ? edgeCluster.clusterSecret : '',
          }}
          render={({ handleSubmit, form, submitting, invalid }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <Field<string>
                  name="name"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  placeholder={t('name.label')}
                  component={renderTextField}
                  autoFocus
                  validate={requiredValidation}
                />
                <Field<string>
                  name="type"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  placeholder={t('type.label')}
                  component={renderAutocomplete}
                  options={['K3S']}
                  validate={requiredValidation}
                />
                <Field<string>
                  name="secret"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  placeholder={t('secret.label')}
                  component={renderTextField}
                  validate={requiredValidation}
                />
              </div>
              <Button type="submit" variant="contained" color="primary" className={classes.submit} disabled={submitting || invalid}>
                {edgeCluster ? t('update.button') : t('create.button')}
              </Button>
              <Button
                type="button"
                variant="contained"
                color="secondary"
                className={classes.submit}
                disabled={submitting}
                onClick={onCancelButtonClick}
              >
                {t('cancel.button')}
              </Button>
            </form>
          )}
        />
      </div>
    </Container>
  );
};

export const CreateEdgeClusterView = withTranslation()(SetEdgeClusterView);

export const UpdateEdgeClusterView = createFragmentContainer(CreateEdgeClusterView, {
  edgeCluster: graphql`
    fragment SetEdgeClusterView_edgeCluster on EdgeCluster {
      id
      name
      clusterType
      clusterSecret
    }
  `,
});
