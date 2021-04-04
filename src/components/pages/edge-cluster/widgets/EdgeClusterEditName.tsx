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

import { EdgeClusterEditName_user } from './__generated__/EdgeClusterEditName_user.graphql';
import { EdgeClusterEditNameQuery } from './__generated__/EdgeClusterEditNameQuery.graphql';

import { RelayEnvironment } from '../../../../framework/relay';
import LoadingContainer from '../../../common/loading';
import GenericErrorContainer from '../../../common/generic-error';
import { UpdateEdgeCluster } from '../../../../framework/relay/mutations';
import { add, NotificationType, Notification } from '../../../../components/common/notification-handler/NotificationHandlerSlice';
import { renderTextField } from '../../../common/react-final-form-components';

export const enNZTranslation = {
  name: 'Name',
  doesNotExist: 'Edge Cluster does not exist',
  required: 'Required',
  update: 'Update',
  cancel: 'Cancel',
  successMessage: 'Successfully updated the edge cluster',
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
  user: EdgeClusterEditName_user;
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

    const { edgeCluster } = user;

    if (edgeCluster === null) {
      return <GenericErrorContainer message={t('edgeClusterEditName.doesNotExist')} />;
    }

    const requiredValidation = (value: string) => (value && value.trim() ? undefined : t('edgeClusterEditName.required'));

    const {
      id: edgeClusterID,
      name,
      clusterType,
      clusterSecret,
      project: { id: projectID },
    } = edgeCluster;

    const handleSubmit = (values: Values) => {
      UpdateEdgeCluster(
        environment,
        {
          projectID,
          edgeClusterID,
          name: values?.name?.trim(),
          clusterType,
          clusterSecret,
        },
        user,
        {
          onSuccess: () => {
            const notification: Notification = { type: NotificationType.Success, message: t('edgeClusterEditName.successMessage') };

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
                placeholder={t('edgeClusterEditName.name')}
                component={renderTextField}
                autoFocus
                validate={requiredValidation}
              />
            </React.Fragment>
            <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={submitting || invalid}>
              {t('edgeClusterEditName.update')}
            </Button>
            <Button type="button" variant="contained" color="secondary" className={classes.button} disabled={submitting} onClick={onClose}>
              {t('edgeClusterEditName.cancel')}
            </Button>
          </form>
        )}
      />
    );
  },
);

const ViewRelayed = createFragmentContainer(View, {
  user: graphql`
    fragment EdgeClusterEditName_user on User {
      edgeCluster(edgeClusterID: $edgeClusterID) {
        id
        name
        clusterType
        clusterSecret
        project {
          id
        }
      }
    }
  `,
});

interface EdgeClusterEditNameProps {
  edgeClusterID: string;
  onClose: () => void;
}

export default React.memo<EdgeClusterEditNameProps>(({ edgeClusterID, onClose }) => {
  if (!edgeClusterID) {
    throw new Error('edge cluster ID is requied');
  }

  return (
    <QueryRenderer<EdgeClusterEditNameQuery>
      environment={RelayEnvironment}
      query={graphql`
        query EdgeClusterEditNameQuery($edgeClusterID: ID!) {
          user {
            ...EdgeClusterEditName_user
          }
        }
      `}
      variables={{ edgeClusterID }}
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
