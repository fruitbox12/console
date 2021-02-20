import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import cuid from 'cuid';

export enum NotificationType {
  Error,
  Warning,
  Info,
  Success,
}

export interface Notification {
  type: NotificationType;
  message: string;
}

export interface Notifications {
  notifications: any;
}

const initialState: Notifications = { notifications: {} };

export const notificationHandlerSlice = createSlice({
  name: 'notificationHandler',
  initialState,
  reducers: {
    add: (state: Notifications, payloadAction: PayloadAction<Notification>) => {
      state.notifications[cuid()] = payloadAction.payload;
    },
    remove: (state: Notifications, payloadAction: PayloadAction<string>) => {
      delete state.notifications[payloadAction.payload];
    },
  },
});

export const selectState = ({ notificationHandler }: { notificationHandler: Notifications }) => ({
  notifications: notificationHandler.notifications,
});

export const { add, remove } = notificationHandlerSlice.actions;

export default notificationHandlerSlice.reducer;
