import { flagNames } from '../structure';

export default function(state = [], action) {
  if (action.type === 'GAME_RESPONSE') {
    if (action.payload.reset) return [flagNames.RESTARTED]; 
    state = [...state, ...action.payload.newFlags];
  }
  return state;
}