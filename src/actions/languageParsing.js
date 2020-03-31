export default function(input, bots, stage, newMessage, advanceStage, clearLog, addBot) {
  let tokens = input.match(/\S+/g);
  var bot;
  var module;
  
  function identify(element, token) {
    return element.name.toLowerCase() === token || (element.shorthand && element.shorthand.toLowerCase() === token);
  }
  
  function shouldHelp(check, undefinedIncluded = false) {
    return (undefinedIncluded && check === undefined) || check === 'help' || check === '?';
  }
  
  if (stage === 'needs reboot') {
    if(input === 'restart') tokens[0] = input;
    else return;
  }
  
  switch (tokens[0]) {
    case 'quit':
    case 'exit':
    case 'end':
      newMessage('Shell process ended.');
      newMessage('You never woke up again. The ship fell into the atmosphere of some planet and you burned up in the process.', 'emotive');
      newMessage('Game over. Your score was: 0', 'emotive');
      break;
      
    case 'help':
    case '?':
      newMessage("The terminal uses grammar following the form of (actor) [action] <parameters...>. The available bots are your actors. Look to the status display to the right to see your available bots.");
      break;
      
    case 'restart':
      newMessage('Restarting terminal...');
      newMessage("Welcome aboard the Relictus Interplanetary Exploration Vessel! You can access shipwide systems from this terminal.");
      
      stage = advanceStage('needs reboot');
      clearLog();
      tokens = ['system', 'report'];
      
    default:
      bots.forEach(element => {
        if (identify(element, tokens[0]))
          bot = element;
      });
      
      if (bot === undefined) {
        newMessage(`Error: unknown actor (${tokens[0]}). Use 'help' for more info.`, 'error');
        return;
      }
  }
  
  switch (tokens[1]) {
    case 'help':
    case '?':
      var response = `Actions for (${bot.name}): ${bot.modules[0].name}`;
      
      const restOfModules = [...bot.modules]; restOfModules.shift();
      restOfModules.forEach(module => response += `, ${module.name}`);
      
      newMessage(response);
      break;
    
    case 'report':
    case undefined:
      if (shouldHelp(tokens[2])) {
        newMessage('The action [report] lists the module statuses of this actor.');
        return;
      }
      
      newMessage(`Report on module statuses for (${bot.name}):`);
      bot.modules.forEach(module => {
        var formatting = '';
        if (module.status === 'Compromised') formatting = 'error';
        if (module.status === 'Damaged') formatting = 'warning';
        newMessage(`${module.name} - ${module.status}`, formatting);
      });
      break;
    
    case 'shorthand':
      if (shouldHelp(tokens[2], true)) {
        newMessage("The action [shorthand] takes a parameter <nickname> and sets this actor's shorthand to <nickname>. From then on all commands may refer to this actor by <nickname>.");
        return;
      }
      
      var nameSpaceTaken = false;
      bots.forEach(bot => { 
        if (identify(bot, tokens[2]))
          nameSpaceTaken = true;
      });
      
      if (['quit', 'exit', 'end', 'restart'].includes(tokens[2]))
        nameSpaceTaken = true;
      
      if (nameSpaceTaken)
        newMessage(`The name ${tokens[2]} has already been taken by an actor or one of the terminal commands, you may not set this actors shorthand to that name.`);
      else {
        bot.shorthand = tokens[2];
        newMessage(`Shorthand of (${bot.name}) has been set to ${bot.shorthand}.`);
      }
      break;
      
    default:
      bot.modules.forEach(element => {
        if (identify(element, tokens[1]))
          module = element;
      });
      
      if (module === undefined) {
        newMessage(`Error: unknown action [${tokens[1]}] for actor (${bot.name}). Use '${bot.name} help' to list available actions.`, 'error');
        return;
      } else {
        module.use();
      }
  }
}