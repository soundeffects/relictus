import { Message } from '../structure';

const initLog = [new Message('Revitalizing process complete. User is now active.', 'success'),
  new Message("You are concious. The edges of your vision are the edges of this terminal screen. You can't feel anything, but you can think. Unfortunately you don't remember much. You had been living in space, on a magnificent starcraft bound for interstellar travel. But now you must think about the present.", 'emotive'),
  new Message("Unexpected error in bootup, shutting down. Force bootup with user command 'restart'.", 'error')];

export default function(state = initLog, action) {
  switch (action.type) {
    case 'USER_INPUT':
      return [...state, new Message(action.payload, 'user')];
    case 'GAME_RESPONSE':
      if (action.payload.reset)
        return action.payload.messages;
      return [...state, ...action.payload.messages];
    default:
      return state;
  }
}