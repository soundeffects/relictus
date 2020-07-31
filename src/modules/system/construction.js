import { Module } from '../../structure';
import Map from '../../map';
import { ArmPart } from '../../items';
import { Grasper } from '..';
 
export default class Construction extends Module {
  #lockedBot;
  
  constructor() {
    super('Construction Pad', 'construct');
    this.#lockedBot = null;
    this.status = 'Standby';
  }
  
  use(actor, parameters, bots, flags, addFlag, addBot, addScore) {
    if (parameters[0] === 'remove') {
      if (!this.#lockedBot) return [['Error: No bot has been readied for construction. For more information see the help for this action.', 'error']];
      
      const module = this.#lockedBot.findModule(parameters[1]);
      if (!module) return [['Error: No module found on the bot matching that description.', 'error']];
      
      const item = this.moduleItemMap(module);
      if (!item) return [['Error: This module cannot be removed.', 'error']];
      
      this.#lockedBot.removeModule(module);
      Map.pad.addContent(item);
      return [['Part removed successfully.', '']];
    } else if (parameters[0]) {
      if (!this.#lockedBot) return [['Error: No bot has been readied for construction. For more information see the help for this action.', 'error']];
      
      const item = Map.pad.findItem(parameters[0]);
      if (!item) return [['Error: part not found at the pad matching that description.', 'error']];
      
      const module = this.moduleItemMap(item);
      if (!module) return [['Error: this part cannot be installed onto a bot.', 'error']];
      
      this.#lockedBot.addModule(module);
      Map.pad.removeContent(item);
      return [['Part installed successfully.', '']];
    } else {
      if (this.#lockedBot) {
        this.#lockedBot.toggleLocked();
        this.#lockedBot = null;
        return [['Construction Pad has been unlocked.', '']];
      } else {
        var message = [['No bots found near the Construction Pad.']]
        bots.forEach(bot => {
          if (bot.location === Map.pad && !this.#lockedBot) {
            this.#lockedBot = bot;
            bot.toggleLocked();
            message = [[`(${bot.name}) has been locked into the Construction Pad. It will not be able to perform any actions until it has been released from the pad with the [construct] action.`, '']];
          }
        });
        return message;
      }
    }
  }
  
  report() {
    if (this.status === 'In Process') {
      return ['A bot is currently locked into the Construction Pad. Ready to install parts.', ''];
    }
    return ['The Construction Pad is operational. Currently on standby.', ''];
  }
  
  help() {
    return "The Construction Pad is used for installing new parts onto Bots and Landers. You must lock a bot into the pad in order to install or remove new parts. To do this use the action [construct] with no parameters and make sure a bot is next to the the pad. To install parts use [construct] with the name of the item as a parameter. To remove a module use the parameter 'remove' followed by the module name as a parameter after that.";
  }
  
  moduleItemMap(object) {
    switch (object.constructor) {
      case ArmPart:
        return new Grasper();
      case Grasper:
        return new ArmPart();
      default:
        return null;
    }
  }
}