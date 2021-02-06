import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import logger from 'redux-logger';
import { reduxBatch } from '@manaflair/redux-batch';

import getRootReducer from './Reducer';

const rootSagas = function* sagas() {
  yield all([]);
};

const getStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: getRootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware).concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
    enhancers: [reduxBatch],
  });

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./Reducer', () => {
      const newRootReducer = require('./Reducer').default;
      store.replaceReducer(newRootReducer);
    });
  }

  sagaMiddleware.run(rootSagas);

  return store;
};

export default getStore;
