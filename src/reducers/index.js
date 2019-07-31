import { combineReducers } from 'redux';
import OompasReducer from './reducer_oompas';

const rootReducer = combineReducers({
  oompas: OompasReducer
});

export default rootReducer;
