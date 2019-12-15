import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as oidc } from '@axa-fr/react-oidc-redux';

export default function getReducers() {
  return combineReducers({
    form: formReducer,
    oidc,
  });
}
