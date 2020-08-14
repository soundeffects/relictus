import { Module, Fixture, flagNames } from '../structure';

export default class Grasper extends Module {
  #heldItem;
  
  constructor() {
    super("Grasper", "arm");
    this.#heldItem = null;
  }
  
  use(actor, parameters, bots, flags, addFlag, addBot, addScore) {
    if (['grab', 'take', 'g'].includes(parameters[0])) {
      if (['help', '?'].includes(parameters[1]))
        return [["The 'grab' function of the arm module instructs the arm to pick up a specified object, as described by the next parameter passed after 'grab.' Note that the arm can only hold one item at a time, and so must drop any held items before picking up a new one.", '']];
      else if (parameters[1]) {
        if (this.#heldItem)
          return [['Error: this module is already holding an item. You must drop the held item before picking up a new one.', 'error']];
        const item = actor.location.findItem(parameters[1]);
        if (!item)
          return [['Error: no item was found matching that description.', 'error']];
        if (item instanceof Fixture || !item.tangible)
          return [['Error: this item cannot be picked up.', 'error']];
          
        this.#heldItem = actor.location.removeContent(item);
        return [['Picked up item.']];
      }
      return [['Error: A description for the item to be grabbed is a required parameter.', 'error']];
    } else if (['drop', 'd'].includes(parameters[0])) {
      if (['help', '?'].includes(parameters[1]))
        return [["The 'drop' function of the arm module instructs the arm to drop whatever item it is currently holding. Throws an error if currently not holding an item.", '']];
      if (!this.#heldItem)
        return [['Error: the arm is not holding anything.', 'error']];
      actor.location.addContent(this.#heldItem);
      this.#heldItem = null;
      return [['Dropped item.']];
    } else if (['use', 'u'].includes(parameters[0])) {
      if (['help', '?'].includes(parameters[1]))
        return [["The 'use' function instructs the arm to use an item. A number of basic uses have been pre-programmed into this module, such as flipping switches, connecting cable endpoints, and other trivial tasks. Simply specify the item you would like to use and the program will automatically perform a common action (if there is one) associated with the described item. If no item is described, the arm will use whatever it is currently holding.", '']];
      else if (parameters[1]) {
        var item;
        if (this.#heldItem && this.#heldItem.names.includes(parameters[1]))
          item = this.#heldItem;
        else
          item = actor.location.findItem(parameters[1]);
        
        if (!item) return [['Error: no item was found matching that description.', 'error']];
        
        return item.use(actor, parameters, bots, flags, addFlag, addScore);
      }
      return 
    } else if (['view', 'v'].includes(parameters[0])) {
      if (['help', '?'].includes(parameters[1]))
        return [["The 'view' function will return examinations conducted on the object held in the grasper by some small observational units installed on this module. It will throw an error if there is no currently held item."]];
      if (!this.#heldItem)
        return [['Error: the arm is not holding anything.', 'error']];
      if (this.#heldItem.names[0] === 'Slip of Paper' && addFlag(flagNames.VIEW_PAPER)) addScore(1);
      return [[this.#heldItem.description, 'emotive']];
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
    return "The grasper allows you to pick up items, drop held items, examine held items, and use items. These are each considered sub-actions. Pass the parameter 'grab' for picking up items, 'drop' for dropping items, 'view' for examining, and 'use' for using items. For more information on a sub-action, pass a sub-action's parameter followed by the parameter 'help'.";
  }
}