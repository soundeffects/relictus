export default function(state = [], action) {
  switch (action.type) {
    case 'USER_INPUT':
      return [...state, action.payload];
    case 'GAME_RESPONSE':
      return [...state, ...action.payload];
    default:
      return state;
  }
}