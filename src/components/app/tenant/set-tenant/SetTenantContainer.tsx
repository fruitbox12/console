import React from 'react';
import { connect, useDispatch } from 'react-redux';
import {} from 'react-redux';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Environment } from 'relay-runtime';

import { CreateTenantView, UpdateTenantView, Values } from './SetTenantView';
import { CreateTenant, UpdateTenant } from '../../../../framework/relay/mutations';
import { add, NotificationType, Notification } from '../../../../components/common/notification-handler/NotificationHandlerSlice';

import { SetTenantContainer_user } from './__generated__/SetTenantContainer_user.graphql';

interface SetTenantContainerProps extends RouteComponentProps {
  user: SetTenantContainer_user;
  readonly relay: {
    environment: Environment;
  };
}

export const SetTenantContainer: React.FC<SetTenantContainerProps> = ({ history, user, relay: { environment } }) => {
  const dispatch = useDispatch();
  const { tenant } = user;

  const setTenant = (values: Values) => {
    if (tenant) {
      // @ts-ignore: Object is possibly 'undefined'.
      UpdateTenant(environment, { tenantID: tenant.id, name: values.name.trim() }, user, {
        onSuccess: () => {
          const notification: Notification = { type: NotificationType.Success, message: 'Successfully updated the tenant' };

          dispatch(add(notification));

          history.push('/tenant');
        },
        onError: (errorMessage: string) => {
          const notification: Notification = { type: NotificationType.Error, message: errorMessage };

          dispatch(add(notification));
        },
      });
    } else {
      // @ts-ignore: Object is possibly 'undefined'.
      CreateTenant(environment, { name: values.name.trim() }, null, {
        onSuccess: () => {
          const notification: Notification = { type: NotificationType.Success, message: 'Successfully created the tenant' };

          dispatch(add(notification));

          history.push('/tenant');
        },
        onError: (errorMessage: string) => {
          const notification: Notification = { type: NotificationType.Error, message: errorMessage };

          dispatch(add(notification));
        },
      });
    }
  };

  const cancel = () => history.push('/tenant');

  if (tenant) {
    return <UpdateTenantView tenant={tenant} onSubmit={setTenant} onCancelButtonClick={cancel} />;
  }

  return <CreateTenantView onSubmit={setTenant} onCancelButtonClick={cancel} />;
};

export default createFragmentContainer(connect()(withRouter(SetTenantContainer)), {
  user: graphql`
    fragment SetTenantContainer_user on User {
      id
      tenant(tenantID: $tenantId) @include(if: $isUpdating) {
        id
        ...SetTenantView_tenant
      }
    }
  `,
});
