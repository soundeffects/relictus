import { Message } from '../structure';
import currentTime from './time';

export default function(input, bots) {
  var messages = [];
  function newMessage(text, style = 0) {
    messages = [new Message(currentTime(), text, style), ...messages];
  }
  
  switch (input.toLowerCase()) {
    case 'easter egg':
      newMessage('This is an easter egg!', 1)
      break;
    default:
      switch (input.toLowerCase()) {
        case 'help':
          newMessage('Welcome to the Relictus Terminal! Here are valid commands:');
          break;
        default:
          newMessage(`Error: unknown command '${input}'. Use 'help' for a list of valid commands.`, 3);
      }
  }
  
  return {
    type: 'GAME_RESPONSE',
    payload: messages
  };
}