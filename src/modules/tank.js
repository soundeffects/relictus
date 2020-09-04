import { Module, flagNames, Fixture } from '../structure';

export default class Tank extends Module {
  #heldLiquid;
  
  constructor() {
    super("Liquid Tank", "tank");
    this.#heldLiquid = null;
  }
  
  use(actor, parameters, bots, flags, addFlag, addBot, addScore) {
    if (parameters[0] === 'in') {
      if (this.#heldLiquid)
        return [['Error: tank is already full, can not input more.', 'error']];
      if (!parameters[1])
        return [['Error: a description for the interface to take liquid from is required as a parameter.', 'error']];
      const liquidInterface = actor.location.findItem(parameters[1]);
      if (!liquidInterface)
        return [['Error: nothing found matching that description.', 'error']];
      this.#heldLiquid = liquidInterface.extractLiquid();
      if (!this.#heldLiquid)
        return [['Error: description provided is not a liquid interface.', 'error']];
      else
        return [[`Successfully extracted ${this.#heldLiquid}.`]];
    } else if (parameters[0] === 'out') {
      if (!this.#heldLiquid)
        return [['Error: tank is empty, cannot output liquid.', 'error']];
      
    } else if (parameters[0]) {
      
    }
    return [["Error: missing parameter <flow>. Options are 'in' and 'out'. See help for more info.", 'error']];
  }
  
  report() {
    var response = `Liquid Tank is ${this.status.toLowerCase()}. Linked to action [tank].`;
    
    return [response, ''];
  }
  
  help() {
    return "The Liquid Tank module can store liquids, and has a pump for input or output of liquids. To use, specify the <flow> parameter, which takes 'in' for input or 'out' for output. Then specify the <interface> paramter, which is a description of where you want to extract liquids from or put liquids into.";
  }
}