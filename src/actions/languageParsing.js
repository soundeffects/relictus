import { flagNames } from '../structure';

export default function(input, bots, flags, newMessage, addFlag, reset, addBot, addScore) {
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
      addFlag(flagNames.DEATH_BY_EXIT);
      return;
      
    case 'help':
    case '?':
      newMessage("The terminal uses grammar following the form of (actor) [action] <parameters...>. The system and the available bots are your actors. Each will have their own set of actions, some requiring parameters to direct how they are performed.");
      newMessage("Note that 'help' can be added after an actor or action to learn more.");
      if (bots.length > 1) {
        newMessage("Look to the status display to see your available bots.");
      } else {
        newMessage("Right now there are no bots activated, but once this happens you will see them listed on the status display. Now that you have learned the workings of this terminal, it is recommended you execute 'system report' to see the status of the ship.");
      }
      return;
      
    case 'restart':
      newMessage('Restarting terminal...');
      newMessage("Welcome aboard the Relictus Interplanetary Exploration Vessel! You can access shipwide systems from this terminal.");
      newMessage("Use 'system report' to view the status of the ship.");
      newMessage("Use 'help' to learn how this terminal works.");
      reset();
      return;
      
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
    case 'status':
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
  
  //ESLint keeps warning about no default case, ignoring
  // eslint-disable-next-line
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
  const responses = module.checkLocked(bot, tokens, bots, flags, addFlag, addBot, addScore);
  responses.forEach(response => newMessage(response[0], response[1]));
}