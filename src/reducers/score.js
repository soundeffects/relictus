export default function(state = 0, action) {
  if (action.type === 'GAME_RESPONSE') {
    if (action.payload.reset) return 0; 
    state += action.payload.score;
  } else if (action.type === 'GAME_OVER_RESTART')
    return 0;
  return state;
}