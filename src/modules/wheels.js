import { Module, Fixture } from '../structure';

export default class Wheels extends Module {
  constructor() {
    super('Wheels', 'move');
  }
  
  use(actor, parameters, bots, stage, advanceStage, addBot) {
    if (['port', 'starboard', 'fore', 'aft', 'p', 's', 'f', 'a'].includes(parameters[0])) {
      const loc = actor.location;
      var hindered = false;
      
      loc.contents.forEach(item => {
        if ((item instanceof Fixture) && item.blocking.includes(parameters[0])) hindered = true;
      });
      
      if (hindered) return [[`(${actor.name}) tried to move in that direction but was blocked.`]];
      
      const destination = loc.getLocation(parameters[0]);
      if (!destination) return [['There is no pathway in that direction!', '']];
      
      actor.location = destination;
      return [[`Movement successful. (${actor.name}) is now in the ${destination.name}.`, '']];
    }
    return [["Invalid argument for parameter <direction>. Valid arguments are 'port', 'starboard', 'fore' and 'aft'.", 'error']];
  }
  
  report() {
    var response = `Wheels are ${this.status}. Wheels linked to action [move].`;
    
    return [response, ''];
  }
  
  help() {
    return "The wheels allow you to use the [move] action to move to another location. Takes a parameter <direction>, valid inputs are port, starboard, fore and aft.";
  }
}