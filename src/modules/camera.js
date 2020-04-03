import { Module, flagNames } from '../structure';

export default class Camera extends Module {
  constructor() {
    super('Camera', 'view');
  }
  
  use(actor, parameters, bots, flags, addFlag, addBot) {
    const loc = actor.location;
    var messages = [];
    
    if (parameters[0] === undefined) {
      if (addFlag(flagNames.FIRST_VIEW)) {
        messages.push([`Viewing the ${loc.name}.`, ''], 
          ["Suddenly you no longer see the terminal screen, you see a room. This change is not without a bit of a suprised jump on your part, at least if you could jump in your current incorporeal state. It seems like you are currently viewing what the bot sees.", 'emotive']
        );
      }
      
      messages.push([loc.description, 'emotive']);
      
      var itemsResponse;
      var oldItems = [];
      
      loc.contents.forEach(item => {
        if (!item.viewed)
          messages.push([item.description, 'emotive']);
        else
          oldItems.push(item);
      });
      
      if (oldItems.length === 1) itemsResponse = `There is a ${oldItems[0].names[0]} in the room.`;
      else if (oldItems.length === 2) itemsResponse = `There is a ${oldItems[0].names[0]} and a ${oldItems[1].names[0]} in the room.`;
      else if (oldItems.length > 2) {
        itemsResponse = 'There is a ';
        oldItems.forEach((item, index) => {
          if (index === directions.length - 1)
            itemsResponse += `and a ${item.names[0]} in the room.`;
          else
            itemsResponse += `${item.names[0]}, `;
        });
      }
      if (itemsResponse !== undefined)
        messages.push([itemsResponse, '']);
      
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
          if (name.toLowerCase() === parameters[0].toLowerCase())
            messages = [[item.description, 'emotive']];
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