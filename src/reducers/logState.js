export default function(state = [], action) {
  switch (action.type) {
    case 'USER_INPUT':
    case 'GAME_RESPONSE':
      return [action.payload, ...state];
    default:
      return state;
  }
}