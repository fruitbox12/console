import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { QueryRenderer } from 'react-relay';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Environment } from 'relay-runtime';

import { ProjectEditName_user } from './__generated__/ProjectEditName_user.graphql';
import { ProjectEditNameQuery } from './__generated__/ProjectEditNameQuery.graphql';

import { RelayEnvironment } from '../../../../framework/relay';
import LoadingContainer from '../../../common/loading';
import GenericErrorContainer from '../../../common/generic-error';
import { UpdateProject } from '../../../../framework/relay/mutations';
import { add, NotificationType, Notification } from '../../../common/notification-handler/NotificationHandlerSlice';
import { renderTextField } from '../../../common/react-final-form-components';

export const enNZTranslation = {
  name: 'Name',
  doesNotExist: 'Project does not exist',
  required: 'Required',
  update: 'Update',
  cancel: 'Cancel',
  successMessage: 'Successfully updated the project',
};

const styles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  row: {
    height: 40,
  },
  titleCell: {
    borderBottom: 'none',
  },
  button: {
    margin: theme.spacing(1, 1, 0),
  },
}));

interface Values {
  name?: string;
}

interface ViewProps {
  user: ProjectEditName_user;
  readonly relay: {
    environment: Environment;
  };
  onClose: () => void;
}

const View = React.memo<ViewProps>(
  ({
    user,
    relay: { environment },

    onClose,
  }) => {
    const classes = styles();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { project } = user;

    if (project === null) {
      return <GenericErrorContainer message={t('projectEditName.doesNotExist')} />;
    }

    const requiredValidation = (value: string) => (value && value.trim() ? undefined : t('projectEditName.required'));

    const { id: projectID, name } = project;

    const handleSubmit = (values: Values) => {
      UpdateProject(
        environment,
        {
          projectID,
          name: values?.name?.trim(),
        },
        user,
        {
          onSuccess: () => {
            const notification: Notification = { type: NotificationType.Success, message: t('projectEditName.successMessage') };

            dispatch(add(notification));
            onClose();
          },
          onError: (errorMessage: string) => {
            const notification: Notification = { type: NotificationType.Error, message: errorMessage };

            dispatch(add(notification));
          },
        },
      );
    };

    return (
      <Form
        onSubmit={handleSubmit}
        initialValues={{
          name,
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
                placeholder={t('projectEditName.name')}
                component={renderTextField}
                autoFocus
                validate={requiredValidation}
              />
            </React.Fragment>
            <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={submitting || invalid}>
              {t('projectEditName.update')}
            </Button>
            <Button type="button" variant="contained" color="secondary" className={classes.button} disabled={submitting} onClick={onClose}>
              {t('projectEditName.cancel')}
            </Button>
          </form>
        )}
      />
    );
  },
);

const ViewRelayed = createFragmentContainer(View, {
  user: graphql`
    fragment ProjectEditName_user on User {
      project(projectID: $projectID) {
        id
        name
      }
    }
  `,
});

interface ProjectEditNameProps {
  projectID: string;
  onClose: () => void;
}

export default React.memo<ProjectEditNameProps>(({ projectID, onClose }) => {
  if (!projectID) {
    throw new Error('project ID is requied');
  }

  return (
    <QueryRenderer<ProjectEditNameQuery>
      environment={RelayEnvironment}
      query={graphql`
        query ProjectEditNameQuery($projectID: ID!) {
          user {
            ...ProjectEditName_user
          }
        }
      `}
      variables={{ projectID }}
      render={({ props, error }) => {
        if (props && props.user) {
          return <ViewRelayed user={props.user} onClose={onClose} />;
        } else if (error) {
          return <GenericErrorContainer message={error.message} />;
        }

        return <LoadingContainer />;
      }}
    />
  );
});
