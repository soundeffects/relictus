import { combineReducers } from 'redux';
import LogState from './logState';
import LogInputs from './logInputs';
import BotStates from './botStates';
import Flags from './flags';
import StatusIsOpen from './statusOpen';
import Score from './score';

const reducers = combineReducers({
  log: LogState,
  inputs: LogInputs,
  bots: BotStates,
  flags: Flags,
  statusIsOpen: StatusIsOpen,
  score: Score
});

export default reducers;