import { Module, Bot } from '../../structure';
import { Wheels, Camera } from '../index';
import Map from '../../map';
 
export default class Maintenance extends Module {
  constructor() {
    super('Maintenance Pad', 'maintenance');
    this.status = 'Pending Activation';
  }
  
  use(actor, parameters, bots, flags, addFlag, addBot, addScore) {
    if (parameters[0] === 'activate') {
      
      const botCore = Map.maintenance.removeContent('Bot Core');
      
      if (botCore) {
        this.status = 'Operational';
        addScore(bots.length);
        var botName = this.digitToText(bots.length - 1);
        
        const newBot = new Bot(botName, Map.maintenance);
        newBot.addModule(new Wheels());
        newBot.addModule(new Camera());
        addBot(newBot);
        
        return [[`Activated one bot core and linked with system as actor (${botName}).`, 'success']];
      } else {
        return [['No bot core found to activate.', 'error']];
      }
    } else if (parameters[0]) {
      return [[`Error: unknown parameter '${parameters[0]}'`, 'error']];
    } else {
      return [['All bot parts fixed. Maintenance process complete.']];
    }
  }
  
  report() {
    if (this.status === 'Pending Activation') {
      return ["A bot pending activation has been found at the Bot Maintenance Pad. Use 'system maintenance activate' to activate.", 'success'];
    }
    return ['Maintenance Pad is operational. Currently on standby.', ''];
  }
  
  help() {
    return "The Maintenence Pad quickly repairs and realigns all the components for all bots on the pad. Simply use the action [maintenance] to perform this. If the parameter 'activate' is used, it will activate a newly constructed bot and link it with system controls.";
  }
  
  digitToText(digit) {
    //ESLint sends warnings about no default case, ignoring.
    //eslint-disable-next-line
    switch (digit) {
      case 0:
        return 'Zero';
      case 1:
        return 'One';
      case 2:
        return 'Two';
      case 3:
        return 'Three';
      case 4:
        return 'Four';
    }
  }
}