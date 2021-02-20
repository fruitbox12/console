import React, { Fragment, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { Map } from 'immutable';

import { remove, selectState, NotificationType, Notification } from './NotificationHandlerSlice';

export default React.memo(() => {
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState(Map<string, Notification>(useSelector(selectState).notifications));
  const context = notifications
    .keySeq()
    .map((key) => {
      return {
        key,
        type: notifications.get(key)?.type,
        message: notifications.get(key)?.message,
        onClose: () => {
          setNotifications(notifications.delete(key));
          dispatch(remove(key));
        },
      };
    })
    .toList();

  return (
    <Fragment>
      {!context.isEmpty() && (
        <Snackbar open={true}>
          <Fragment>
            {context.map((notification) => {
              if (notification.type === NotificationType.Error) {
                return (
                  <Alert key={notification.key} elevation={6} onClose={notification.onClose} severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {notification.message}
                  </Alert>
                );
              }

              if (notification.type === NotificationType.Warning) {
                return (
                  <Alert key={notification.key} elevation={6} onClose={notification.onClose} severity="warning">
                    <AlertTitle>Warning</AlertTitle>
                    {notification.message}
                  </Alert>
                );
              }

              if (notification.type === NotificationType.Info) {
                return (
                  <Alert key={notification.key} elevation={6} onClose={notification.onClose} severity="info">
                    <AlertTitle>Info</AlertTitle>
                    {notification.message}
                  </Alert>
                );
              }

              if (notification.type === NotificationType.Success) {
                return (
                  <Alert key={notification.key} elevation={6} onClose={notification.onClose} severity="success">
                    <AlertTitle>Success</AlertTitle>
                    {notification.message}
                  </Alert>
                );
              }

              throw new Error(`Notification type: ${notification.type} is not supported`);
            })}
          </Fragment>
        </Snackbar>
      )}
    </Fragment>
  );
});
