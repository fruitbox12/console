import React from 'react';
import { Form, Field } from 'react-final-form';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { RelayEnvironment } from '../../../framework/relay';
import { CreateEdgeCluster } from '../../../framework/relay/mutations';
import { add, NotificationType, Notification } from '../../../components/common/notification-handler/NotificationHandlerSlice';
import { renderTextField, renderAutocomplete } from '../../common/react-final-form-components';

export const enNZTranslation = {
  title: 'Create Edge Cluster',
  name: 'Name',
  type: 'Type',
  secret: 'Secret',
  create: 'Create',
  cancel: 'Cancel',
  required: 'Required',
  successMessage: 'Successfully created the edge cluster',
};

const styles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(1, 1, 0),
  },
}));

export interface Values {
  name?: string;
  type?: string;
  secret?: string;
}

interface ViewProps {
  onCancelButtonClick: () => void;
  onSubmit: (values: Values) => void;
}

const View: React.FC<ViewProps> = ({ onSubmit, onCancelButtonClick }) => {
  const classes = styles();
  const { t } = useTranslation();

  const requiredValidation = (value: string) => (value && value.trim() ? undefined : t('edgeClusterCreate.required'));

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <React.Fragment>
        <Typography variant="h5">{t('edgeClusterCreate.title')}</Typography>
        <Form
          onSubmit={onSubmit}
          initialValues={{
            name: '',
            type: '',
            secret: '',
          }}
          render={({ handleSubmit, form, submitting, invalid }) => (
            <form onSubmit={handleSubmit}>
              <React.Fragment>
                <Field<string>
                  name="name"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  placeholder={t('edgeClusterCreate.name')}
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
                  placeholder={t('edgeClusterCreate.type')}
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
                  placeholder={t('edgeClusterCreate.secret')}
                  component={renderTextField}
                  validate={requiredValidation}
                />
              </React.Fragment>
              <Button type="submit" variant="contained" color="primary" className={classes.submit} disabled={submitting || invalid}>
                {t('edgeClusterCreate.create')}
              </Button>
              <Button
                type="button"
                variant="contained"
                color="secondary"
                className={classes.submit}
                disabled={submitting}
                onClick={onCancelButtonClick}
              >
                {t('edgeClusterCreate.cancel')}
              </Button>
            </form>
          )}
        />
      </React.Fragment>
    </Container>
  );
};

interface CreateEdgeClusterContainerProps
  extends RouteComponentProps<{
    projectID?: string;
  }> {}

const CreateEdgeClusterContainer: React.FC<CreateEdgeClusterContainerProps> = ({
  history,
  match: {
    params: { projectID },
  },
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const setEdgeCluster = (values: Values) => {
    CreateEdgeCluster(
      RelayEnvironment,
      {
        projectID,
        name: values?.name?.trim(),
        clusterType: values?.type?.trim(),
        clusterSecret: values?.secret?.trim(),
      },
      null,
      {
        onSuccess: () => {
          const notification: Notification = { type: NotificationType.Success, message: t('edgeClusterCreate.successMessage') };

          dispatch(add(notification));

          history.push(`/${projectID}/edgecluster`);
        },
        onError: (errorMessage: string) => {
          const notification: Notification = { type: NotificationType.Error, message: errorMessage };

          dispatch(add(notification));
        },
      },
    );
  };

  const cancel = () => history.push(`/${projectID}/edgecluster`);

  return <View onSubmit={setEdgeCluster} onCancelButtonClick={cancel} />;
};

export default withRouter(CreateEdgeClusterContainer);
