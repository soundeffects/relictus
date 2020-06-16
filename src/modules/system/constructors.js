import { Bot, Module, flagNames } from '../../structure';
import Map from '../../map';
import { Wheels, Camera } from '../index';
 
export default class Constructors extends Module {
  constructor() {
    super('Constructors', 'construct');
  }
  
  use(actor, parameters, bots, flags, addFlag, addBot, addScore) {
    if (parameters[0] === 'lander') {
      if (parameters[1] === 'solder') {
        
      } else {
        return [["The parts scanned by the constructor at the lander pad are not compatible for constructing a lander. The option to solder them together remains. In order to do so, add the parameter 'solder' at the end of your command."]];
      }
    } else if (parameters[0] === 'bot') {
      if (parameters[1] === 'solder') {
        
      } else if (parameters[1] === 'repair') {
        
      } else {
        return [["The parts scanned by the constructor at the bot maintainence pad are not compatible for constructing a bot. The option to solder them together remains. In order to do so, add the parameter 'solder' at the end of your command."]];
      }
    }
    
    return [['Construction successful.', 'success']];
  }
  
  report() {
    return ['Lander and bot constructors are operational, currently on standby.', ''];
  }
  
  help() {
    return "There are two constructors aboard the ship, one for constructing bots and one for constructing landers. To activate one of the constructors, use the action [construct] and pass as a parameter either 'lander' or 'bot' to construct at the desired pad. The constructors can scan for parts already placed at a pad and will automatically install those parts, no configuration required. As a second parameter, you may pass 'solder' to simply solder two items together instead of constructing them as programmed. At the bot maintainence pad, you may also pass the second parameter 'repair'  and the constructor will scan for damages or incongruencies and repair those automatically.";
  }
}