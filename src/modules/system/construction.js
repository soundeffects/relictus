import { Module } from '../../structure';
import Map from '../../map';
 
export default class Construction extends Module {
  #lockedBot;
  
  constructor() {
    super('Construction Pad', 'construction');
    this.#lockedBot = null;
  }
  
  use(actor, parameters, bots, flags, addFlag, addBot, addScore) {
    if (parameters[1]) {
      const part = Map.pad.findItem(parameters[1]);
      
      if (!part) return [[`No part found matching the name '${parameters[1]}'.`, 'error']];
      
      return [['Constructing...', '']];
    } else if (this.#lockedBot) {
      this.#lockedBot.toggleLocked();
      const botName = this.#lockedBot.name;
      this.#lockedBot = null;
      return [
        [`(${botName}) has been unlocked.`, ''],
        ['Warning: this bot does not have suitable parts installed in order to serve as a lander.', 'warning']
      ];
    } else {
      bots.forEach(bot => {
        if (bot.location === Map.pad) {
          this.#lockedBot = bot;
          bot.toggleLocked();
          return [[`(${bot.name}) has been locked into the Lander Construction Pad. Construction ready.`, '']];
        }
      });
      
      return [['No bots found at the Lander Construction Pad.', 'warning']];
    }
  }
  
  report() {
    return ['The Lander Construction Pad is operational. Currently on standby.', ''];
  }
  
  help() {
    return "To use the Lander Construction Pad, you must lock a bot into the pad. This bot will be transformed, through the addition of specific parts, into a lander. Simply use the [lander-pad] action to first lock a bot into the Lander Construction Pad, then use [lander-pad] again with the name of the part you would like to attach and the Construction Pad will automatically scan and install the specified part. Note that the part must be present at the pad for the process to succeed.";
  }
}