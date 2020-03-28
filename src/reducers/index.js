import { combineReducers } from 'redux';
import LogState from './logState';
import BotStates from './botStates';

const reducers = combineReducers({
  log: LogState,
  bots: BotStates
});

export default reducers;