export default function(state = [], action) {
  switch (action.type) {
    case 'USER_INPUT':
      return [action.payload, ...state];
    case 'GAME_OVER_RESTART':
      return ['restart'];
    case 'GAME_RESPONSE':
      if (action.payload.reset) return ['restart'];
    //ESLint keeps warning about no break statement. Ignoring.
    // eslint-disable-next-line
    default:
      return state;
  }
}