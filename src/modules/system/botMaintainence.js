import { Module, flagNames, SolderedItem } from '../../structure';
import Map from '../../map';
 
export default class BotMaintainence extends Module {
  constructor() {
    super('Bot Maintainence', 'bot-pad');
  }
  
  use(actor, parameters, bots, flags, addFlag, addBot, addScore) {
    if (parameters[0] === 'lander') {
      if (parameters[1] === 'solder') {
        if (Map.pad.contents.length > 1) {
          var itemOne;
          var itemTwo;
          
          Map.pad.contents.forEach(item => {
            if (item.solderable) {
              if (!itemOne)
                itemOne = item;
              else {
                itemTwo = item;
                
                Map.pad.removeContent(itemOne.names[0]);
                Map.pad.removeContent(itemTwo.names[0]);
                Map.pad.addContent(new SolderedItem(itemOne, itemTwo));
                return [["Solder successful.", 'success']];
              }
            }
          });
          
          return [["No suitable items to solder detected.", '']];
        }
      } else {
        return [["The parts scanned by the constructor at the lander pad are not compatible for constructing a lander. The option to solder them together remains. In order to do so, add the parameter 'solder', followed by the names of the two items to solder as parameters.", 'warning']];
      }
    } else if (parameters[0] === 'bot') {
      if (parameters[1] === 'solder') {
        if (Map.station.contents.length > 1) {
          Map.station.contents.forEach(item => {
            if (item.solderable) {
              if (!itemOne)
                itemOne = item;
              else {
                itemTwo = item;
                
                Map.station.removeContent(itemOne.names[0]);
                Map.station.removeContent(itemTwo.names[0]);
                Map.station.addContent(new SolderedItem(itemOne, itemTwo));
                return [["Solder successful.", "success"]];
              }
            }
          });
        }
        
        return [["No suitable items to solder detected.", '']];
      } else if (parameters[1] === 'repair') {
        if (Map.station.findItem("Bot One")) {
          return [["There is currently a build in progress on the maintainence pad. Please finish the build to free the pad before using the 'repair' parameter.", 'warning']];
        }
        
        return [["There are no damages to bots detected.", '']];
      } else {
        if (Map.station.findItem("Bot One")) {
          addScore(1);
          Map.station.removeContent("Bot One");
          addFlag(flagNames.BOT_ONE_READY);
          return [["The construction of the bot out of parts on the maintainence pad is complete. Please use the system activator to operate the bot.", 'success']];
        }
        
        return [["The parts scanned by the constructor at the bot maintainence pad are not compatible for constructing a bot. The option to solder them together remains. In order to do so, add the parameter 'solder' at the end of your command.", 'warning']];
      }
    } else if (parameters[0]) {
      return [[`Parameter '${parameters[0]}' is not valid. See 'system construct help' for more information.`, 'error']];
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