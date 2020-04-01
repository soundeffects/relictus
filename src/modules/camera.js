import { Module, flagNames } from '../structure';

export default class Camera extends Module {
  constructor() {
    super('Camera', 'view');
  }
  
  use(actor, parameters, bots, flags, addFlag, addBot) {
    if (addFlag(flagNames.FIRST_VIEW)) {
      return [
        [`Viewing the ${actor.location.name}.`, ''], 
        ["Suddenly you no longer see the terminal screen, you see a room. This change is not without a bit of a suprised jump on your part, at least if you could jump in your current incorporeal state. It seems like you are currently viewing what the bot sees.", 'emotive'],
        [actor.location.description, 'emotive'],
        [actor.location.getPathways(), '']
      ];
    }
    return [[actor.location.description, 'emotive'], [actor.location.getPathways(), '']];
  }
  
  report() {
    var response = `Camera is ${this.status}. Camera linked to action [view].`;
    
    return [response, ''];
  }
  
  help() {
    return "The camera allows you to use the [view] action to view the bots surroundings.";
  }
}