
import { combineReducers } from 'redux';

import drawer from './drawer';
import categoryReducer from './categoryReducer';
import login from './login';
import incidents from './incidents';
import enquires from './enquiries';
import nearby from './nearby';
import profile from './profile'

export default combineReducers({
  drawer,
  categoryReducer,
  login,
  incidents,
  enquires,
  nearby,
  profile,
});
