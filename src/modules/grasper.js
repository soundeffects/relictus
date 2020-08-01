import { Module } from '../structure';

export default class Grasper extends Module {
  #heldItem;
  
  constructor() {
    super("Grasper", "arm");
    this.#heldItem = null;
  }
  
  use(actor, parameters, bots, flags, addFlag, addBot, addScore) {
    if (['grab', 'take'].includes(parameters[0])) {
      return [['placeholder grab']];
    } else if (parameters[0] === 'drop') {
      return [['placeholder drop']];
    } else if (parameters[0] === 'use') {
      return [['placeholder use']];
    } else if (parameters[0]) {
      return [[`Error: unknown parameter '${parameters[0]}'. For more information on parameters see the help for this action.`, 'error']];
    }
    return [['Error: parameter required. For more information on parameters see the help for this action.', 'error']];
  }
  
  report() {
    var response = `Grasper is ${this.status.toLowerCase()}. Grasper linked to action [arm].`;
    
    return [response, ''];
  }
  
  help() {
    return "The grasper allows you to pick up items, drop held items, and use items. These are each considered sub-actions. Pass the parameter 'grab' for picking up items, 'drop' for dropping items, and 'use' for using items. For more information on a sub-action, pass a sub-action's parameter followed by the parameter 'help'.";
  }
}