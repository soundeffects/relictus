export default function(input, bots, stage, newMessage, advanceStage, clearLog) {
  function reboot() {
    newMessage('Restarting terminal...');
    newMessage("Welcome aboard the Relictus Interplanetary Exploration Vessel! You can access shipwide systems from this terminal.");
    // call system restart and report instead here
    newMessage('Restarting ship systems...');
    newMessage('Life support and generator processes online.');
    newMessage('Warning: errors encountered navigation, communication, surveillance and thruster processes. A damage checkup is recommended. Skipping for now.', 'warning');
    newMessage("No bots currently active. To find and activate available bots, use 'system activate'.");
    stage = advanceStage('needs reboot');
    clearLog();
  }
  
  if (stage === 'needs reboot') {
    if(input === 'restart') reboot();
  }
  
  else switch (input) {
    case 'quit':
    case 'exit':
      newMessage('Shell process ended.');
      newMessage('You never woke up again. The ship fell into the atmosphere of some planet and you burned up in the process.', 'emotive');
      newMessage('Game over. Your score was: 0', 'emotive');
      break;
    case '?':
    case 'help':
      newMessage("The terminal uses grammar following the form of (actor) [action] <parameters...>. The available bots are your actors. Look to the status display to the right to see your available bots.");
      break;
    case 'restart':
      reboot();
      break;
    case 'easter egg':
      newMessage('This is an easter egg!', 'emotive');
      break;
    default:
      const tokens = input.match(/\S+/g);

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
}