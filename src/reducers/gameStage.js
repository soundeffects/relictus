export default function(state = 'needs reboot', action) {
  if (action.type === 'GAME_RESPONSE')
    state = action.payload.stage;
  return state;
}