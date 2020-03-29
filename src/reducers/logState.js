import { Message } from '../structure';

const initLog = [new Message('Revitalizing process complete. User is now active.', 'success'),
  new Message("Unexpected error in bootup, shutting down. Force bootup with user command 'reboot'.", 'error')];

export default function(state = initLog, action) {
  switch (action.type) {
    case 'USER_INPUT':
      return [...state, action.payload];
    case 'GAME_RESPONSE':
      return [...state, ...action.payload];
    default:
      return state;
  }
}