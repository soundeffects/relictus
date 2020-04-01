import { combineReducers } from 'redux';
import LogState from './logState';
import BotStates from './botStates';
import Flags from './flags';

const reducers = combineReducers({
  log: LogState,
  bots: BotStates,
  flags: Flags
});

export default reducers;