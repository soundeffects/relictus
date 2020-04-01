import { flagNames } from '../structure';

export default function(input, bots, flags, newMessage, addFlag, reset, addBot) {
  let tokens = input.match(/\S+/g);
  var bot;
  var module;
  
  function identify(element, token) {
    if (element.action)
      return element.action.toLowerCase() === token || (element.shorthand && element.shorthand.toLowerCase() === token);
    return element.name.toLowerCase() === token || (element.shorthand && element.shorthand.toLowerCase() === token);
  }
  
  function shouldHelp(check, undefinedIncluded = false) {
    return (undefinedIncluded && check === undefined) || check === 'help' || check === '?';
  }
  
  if (!flags.includes(flagNames.RESTARTED)) {
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
      return;
      
    case 'help':
    case '?':
      newMessage("The terminal uses grammar following the form of (actor) [action] <parameters...>. The available bots are your actors. Look to the status display to the right to see your available bots.");
      return;
      
    case 'restart':
      newMessage('Restarting terminal...');
      newMessage("Welcome aboard the Relictus Interplanetary Exploration Vessel! You can access shipwide systems from this terminal.");
      
      reset();
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
      var response = `Actions for (${bot.name}): ${bot.modules[0].action}`;
      
      const restOfModules = [...bot.modules]; restOfModules.shift();
      restOfModules.forEach(module => response += `, ${module.action}`);
      
      newMessage(response);
      return;
    
    case 'report':
    case undefined:
      if (shouldHelp(tokens[2])) {
        newMessage('The action [report] lists the module statuses of this actor.');
        return;
      }
      
      newMessage(`Report on module statuses for (${bot.name}):`);
      bot.modules.forEach(module => {
        const report = module.report();
        newMessage(report[0], report[1]);
      });
      return;
    
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
      
      if (['quit', 'exit', 'end', 'restart', 'shorthand', 'report'].includes(tokens[2]))
        nameSpaceTaken = true;
      
      if (nameSpaceTaken)
        newMessage(`The name '${tokens[2]}' has already been taken by an actor or one of the terminal commands, you may not set this actors shorthand to that name.`);
      else {
        bot.shorthand = tokens[2];
        newMessage(`Shorthand of (${bot.name}) has been set to '${bot.shorthand}'.`);
      }
      return;
      
    default:
      bot.modules.forEach(element => {
        if (identify(element, tokens[1]))
          module = element;
      });
      
      if (module === undefined) {
        newMessage(`Error: unknown action [${tokens[1]}] for actor (${bot.name}). Use '${bot.name} help' to list available actions.`, 'error');
        return;
      }
  }
  
  switch (tokens[2]) {
    case 'help':
    case '?':
      newMessage(module.help());
      return;
      
    case 'shorthand':
      if (shouldHelp(tokens[3], true)) {
        newMessage("The parameter <shorthand> indicates a parameter <nickname> and sets this action's shorthand to <nickname>. From then on all commands may refer to this action on this specific actor by <nickname>.");
        return;
      }
      
      nameSpaceTaken = false;
      bot.modules.forEach(module => { 
        if (identify(module, tokens[3]))
          nameSpaceTaken = true;
      });
      if (['quit', 'exit', 'end', 'restart', 'shorthand', 'report'].includes(tokens[3]))
        nameSpaceTaken = true;
      
      if (nameSpaceTaken)
        newMessage(`The name '${tokens[3]}' has already been taken by an action on this actor or one of the terminal commands, you may not set this action's shorthand to that name.`);
      else {
        module.shorthand = tokens[3];
        newMessage(`Shorthand of [${module.action}] has been set to '${module.shorthand}'.`);
      }
      return;
  }
  
  tokens.shift(); tokens.shift();
  const responses = module.use(bot, tokens, bots, flags, addFlag, addBot);
  responses.forEach(response => newMessage(response[0], response[1]));
}