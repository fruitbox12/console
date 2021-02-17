import GobalReducer from './GlobalSlice';
import { NotificationHandlerReducer } from '../../components/common/notification-handler';

const reducer = {
  global: GobalReducer,
  notificationHandler: NotificationHandlerReducer,
};

export default reducer;
