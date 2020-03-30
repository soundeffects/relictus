import { Message } from '../structure';

const initLog = [new Message('Revitalizing process complete. User is now active.', 'success'),
  new Message("You are concious. Your view is only this terminal you see in front of you now. You aren't at a computer screen; your vision is really only this small rectangular area, which is being fed directly into your brain. You can't feel anything, but you can think. Unfortunately you don't remember much. You had been living in space, joined the crew of a ship bound for interplanetary survey, not much else is clear. Well, time to think about the situation at hand. What can you do?", 'emotive'),
  new Message("Unexpected error in bootup, shutting down. Force bootup with user command 'restart'.", 'error')];

export default function(state = initLog, action) {
  switch (action.type) {
    case 'USER_INPUT':
      return [...state, action.payload];
    case 'GAME_RESPONSE':
      if (action.payload.clearLog)
        return action.payload.messages;
      return [...state, ...action.payload.messages];
    default:
      return state;
  }
}