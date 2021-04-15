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
import { CreateProject } from '../../../framework/relay/mutations';
import { add, NotificationType, Notification } from '../../common/notification-handler/NotificationHandlerSlice';
import { renderTextField } from '../../common/react-final-form-components';

export const enNZTranslation = {
  title: 'Create Project',
  name: 'Name',
  create: 'Create',
  cancel: 'Cancel',
  required: 'Required',
  successMessage: 'Successfully created the project',
};

const styles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(1, 1, 0),
  },
}));

export interface Values {
  name?: string;
}

interface ViewProps {
  onCancelButtonClick: () => void;
  onSubmit: (values: Values) => void;
}

const View: React.FC<ViewProps> = ({ onSubmit, onCancelButtonClick }) => {
  const classes = styles();
  const { t } = useTranslation();

  const requiredValidation = (value: string) => (value && value.trim() ? undefined : t('projectCreate.required'));

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <React.Fragment>
        <Typography variant="h5">{t('projectCreate.title')}</Typography>
        <Form
          onSubmit={onSubmit}
          initialValues={{
            name: '',
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
                  placeholder={t('projectCreate.name')}
                  component={renderTextField}
                  autoFocus
                  validate={requiredValidation}
                />
              </React.Fragment>
              <Button type="submit" variant="contained" color="primary" className={classes.submit} disabled={submitting || invalid}>
                {t('projectCreate.create')}
              </Button>
              <Button
                type="button"
                variant="contained"
                color="secondary"
                className={classes.submit}
                disabled={submitting}
                onClick={onCancelButtonClick}
              >
                {t('projectCreate.cancel')}
              </Button>
            </form>
          )}
        />
      </React.Fragment>
    </Container>
  );
};

interface CreateProjectContainerProps
  extends RouteComponentProps<{
    projectID?: string;
  }> {}

const CreateProjectContainer: React.FC<CreateProjectContainerProps> = ({ history }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const setProject = (values: Values) => {
    CreateProject(
      RelayEnvironment,
      {
        name: values?.name?.trim(),
      },
      null,
      {
        onSuccess: () => {
          const notification: Notification = { type: NotificationType.Success, message: t('projectCreate.successMessage') };

          dispatch(add(notification));

          history.push('/project');
        },
        onError: (errorMessage: string) => {
          const notification: Notification = { type: NotificationType.Error, message: errorMessage };

          dispatch(add(notification));
        },
      },
    );
  };

  const cancel = () => history.push('/project');

  return <View onSubmit={setProject} onCancelButtonClick={cancel} />;
};

export default withRouter(CreateProjectContainer);
