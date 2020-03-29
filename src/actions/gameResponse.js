import { Message } from '../structure';

export default function(input, bots) {
  var messages = [];
  function newMessage(text, style = '') {
    messages = [...messages, new Message(text, style)];
  }
  
  switch (input.toLowerCase()) {
    case 'help':
      newMessage("The terminal uses grammar following the form of (actor) [action] <parameters...>. The available bots are your actors. Look to the status display to the right to see your available bots.");
      break;
    case 'reboot':
      newMessage('Rebooting terminal...', 'warning');
      newMessage("Welcome aboard the Relictus Interplanetary Exploration Vessel! You can access shipwide systems from this terminal.");
      newMessage("System not found; either you are disconnected or the system is offline. Try 'system reboot'.", 'error');
      break;
    case 'easter egg':
      newMessage('This is an easter egg!', 'emotive');
      break;
    default:
      const tokens = input.toLowerCase().match(/\S+/g);
      
      var bot;
      bots.forEach(element => {
        if (element.name.toLowerCase() === tokens[0] || element.shorthand.toLowerCase() === tokens[0])
          bot = element;
      });
      
      if (bot === undefined)
        newMessage(`Error: unknown actor '${tokens[0]}'. Use 'help' for more info.`, 'error');
      else {
        newMessage("No action specified, using default 'report'.", 'warning');
      }
  }
  
  return {
    type: 'GAME_RESPONSE',
    payload: messages
  };
}