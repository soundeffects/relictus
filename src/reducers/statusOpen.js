export default function(state = false, action) {
  if (action.type === 'TOGGLE_STATUS')
    return !state;
  return state;
}