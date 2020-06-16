import { Module, flagNames, Fixture } from '../structure';

export default class Camera extends Module {
  constructor() {
    super("Camera", "view");
  }
  
  use(actor, parameters, bots, flags, addFlag, addBot, addScore) {
    const loc = actor.location;
    var messages = [];
    
    if (parameters[0] === undefined) {
      if (addFlag(flagNames.FIRST_VIEW)) {
        addScore(2);
        
        messages.push(["Suddenly you no longer see the terminal screen, you see a room. This change is not without a bit of a suprised jump on your part, at least if you could jump in your current incorporeal state. You see the bot you were controlling, its small body attached to rails on the ground. You also see the room its in.", 'emotive']);
      }
      
      messages.push([`Viewing the ${loc.name}.`, '']);
      messages.push([loc.description, 'emotive']);
      
      loc.contents.forEach(item => {
        if (!(item instanceof Fixture))
          messages.push([item.glance, 'emotive']);
      });
      
      var pathwaysResponse = 'There ';
      var directions = [];
      
      if (loc.getLocation('p')) directions.push('port');
      if (loc.getLocation('s')) directions.push('starboard');
      if (loc.getLocation('f')) directions.push('fore');
      if (loc.getLocation('a')) directions.push('aft');
      
      if (directions.length === 0) pathwaysResponse += 'are no pathways from here.';
      else if (directions.length === 1) pathwaysResponse += `is a pathway to ${directions[0]}.`;
      else if (directions.length === 2) pathwaysResponse += `are pathways to ${directions[0]} and to ${directions[1]}.`;
      else {
        pathwaysResponse += 'are pathways ';
        directions.forEach((direction, index) => {
          if (index === directions.length - 1)
            pathwaysResponse += `and to ${direction}.`;
          else
            pathwaysResponse += `to ${direction}, `;
        });
      }
      
      messages.push([pathwaysResponse, '']);
    } else {
      loc.contents.forEach(item => {
        item.names.forEach(name => {
          if (name.toLowerCase() === parameters[0].toLowerCase()) {
            if (item.names[0] === 'Slip of Paper') addScore(1);
            messages = [[item.description, 'emotive']];
          }
        });
      });
      
      if (messages.length === 0)
        messages = [[`There are no objects that match the name '${parameters[0]}' near (${actor.name}).`, '']];
    }
    
    return messages;
  }
  
  report() {
    var response = `Camera is ${this.status}. Camera linked to action [view].`;
    
    return [response, ''];
  }
  
  help() {
    return "The camera allows you to use the [view] action to view the bots surroundings.";
  }
}