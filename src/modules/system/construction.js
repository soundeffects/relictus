import { Module } from '../../structure';
import Map from '../../map';
 
export default class Construction extends Module {
  #lockedBot;
  
  constructor() {
    super('Construction Pad', 'construction');
    this.#lockedBot = null;
    this.status = 'Standby';
  }
  
  use(actor, parameters, bots, flags, addFlag, addBot, addScore) {
    if (parameters[0]) {
      return [['Error: part not found at the pad matching that description.', 'error']]
    } else {
      if (this.#lockedBot) {
        this.#lockedBot.toggleLocked();
        this.#lockedBot = null;
        return [['Construction Pad has been unlocked.', '']];
      } else {
        bots.forEach(bot => {
          if (bot.location === Map.pad) {
            this.#lockedBot = bot;
            bot.toggleLocked();
            return [[`(${bot.name}) has been locked into the Construction Pad. Ready to install parts.`, '']];
          }
        });
        return [['No bots found near the Construction Pad.', 'error']];
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
    return "The Construction Pad is used for installing new parts onto Bots and Landers. You must lock a bot into the pad in order to install new parts. To do this use the action [construction] with no parameters and make sure a bot is next to the the pad. To unlock the bot is the same. To install parts simply use the same action with the name of the part you wish to install as a parameter.";
  }
}