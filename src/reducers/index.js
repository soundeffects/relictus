import { combineReducers } from 'redux';
import LogState from './logState';
import TimeState from './timeState';

const reducers = combineReducers({
  log: LogState,
  time: TimeState
});

export default reducers;