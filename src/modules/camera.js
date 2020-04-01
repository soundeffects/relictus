import { Module, flagNames } from '../structure';

export default class Camera extends Module {
  constructor() {
    super('Camera', 'view');
  }
  
  use(actor, parameters, bots, flags, addFlag, addBot) {
    const loc = actor.location;
    
    var pathways = 'There ';
    var directions = [];
    
    if (loc.getLocation('p')) directions = ['port'];
    if (loc.getLocation('s')) directions = [...directions, 'starboard'];
    if (loc.getLocation('f')) directions = [...directions, 'fore'];
    if (loc.getLocation('a')) directions = [...directions, 'aft'];
    
    if (directions.length === 0) pathways += 'are no pathways from here.';
    else if (directions.length === 1) pathways += `is a pathway to ${directions[0]}.`;
    else if (directions.length === 2) pathways += `are pathways to ${directions[0]} and to ${directions[1]}.`;
    else {
      pathways += 'are pathways ';
      directions.forEach((direction, index) => {
        if (index === directions.length - 1)
          pathways += `and to ${direction}.`;
        else
          pathways += `to ${direction}, `;
      });
    }
    
    if (addFlag(flagNames.FIRST_VIEW)) {
      return [
        [`Viewing the ${loc.name}.`, ''], 
        ["Suddenly you no longer see the terminal screen, you see a room. This change is not without a bit of a suprised jump on your part, at least if you could jump in your current incorporeal state. It seems like you are currently viewing what the bot sees.", 'emotive'],
        [loc.description, 'emotive'],
        [pathways, '']
      ];
    }
    
    return [[loc.description, 'emotive'], [pathways, '']];
  }
  
  report() {
    var response = `Camera is ${this.status}. Camera linked to action [view].`;
    
    return [response, ''];
  }
  
  help() {
    return "The camera allows you to use the [view] action to view the bots surroundings.";
  }
}