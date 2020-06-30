import { Module, SolderedItem } from '../../structure';
import Map from '../../map';
 
export default class LanderConstruction extends Module {
  constructor() {
    super('Lander Construction', 'lander-pad');
  }
  
  use(actor, parameters, bots, flags, addFlag, addBot, addScore) {
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
    return [['Construction successful.', 'success']];
  }
  
  report() {
    return ['The Lander Construction Pad is operational. Currently on standby.', ''];
  }
  
  help() {
    return "There are two constructors aboard the ship, one for constructing bots and one for constructing landers. To activate one of the constructors, use the action [construct] and pass as a parameter either 'lander' or 'bot' to construct at the desired pad. The constructors can scan for parts already placed at a pad and will automatically install those parts, no configuration required. As a second parameter, you may pass 'solder' to simply solder two items together instead of constructing them as programmed. At the bot maintainence pad, you may also pass the second parameter 'repair'  and the constructor will scan for damages or incongruencies and repair those automatically.";
  }
}