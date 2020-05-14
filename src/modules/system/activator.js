import { Bot, Module, flagNames } from '../../structure';
import Map from '../../map';
import { Wheels, Camera } from '../index';

export default class Activate extends Module {
  constructor() {
    super('Activator', 'activate');
  }
  
  use(actor, parameters, bots, flags, addFlag, addBot) {
    if (addFlag(flagNames.FIRST_BOT)) {
      const firstBot = new Bot('Zero', Map.station);
      firstBot.addModule(new Wheels());
      firstBot.addModule(new Camera());
      addBot(firstBot);
      return [['Found 1 available bot(s). Activating now.', 'success']];
    }
    
    return [['No available bots found.', '']]
  }
  
  report() {
    var response = `No bots detected. Use 'system activate' to find and activate all available bots.`;
    
    return [response, ''];
  }
  
  help() {
    return 'The activation operation allows the system to purpose bots aboard the ship for different tasks. Using activation in the terminal allows the terminal user to control the bot directly.';
  }
}