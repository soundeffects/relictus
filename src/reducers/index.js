import { combineReducers } from 'redux';
import LogState from './logState';
import BotStates from './botStates';
import GameStage from './gameStage';

const reducers = combineReducers({
  log: LogState,
  bots: BotStates,
  stage: GameStage
});

export default reducers;