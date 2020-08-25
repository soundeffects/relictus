import { Module, flagNames, Fixture } from '../structure';

export default class Tank extends Module {
  constructor() {
    super("Liquid Tank", "tank");
  }
  
  use(actor, parameters, bots, flags, addFlag, addBot, addScore) {
    if (parameters[0] === 'in') {
      
    } else if (parameters[0] === 'out') {
      
    } else if (parameters[0]) {
      
    }
    return [["Error: missing parameter <flow>. Options are 'in' and 'out'. See help for more info.", 'error']]
  }
  
  report() {
    var response = `Liquid Tank is ${this.status.toLowerCase()}. Linked to action [tank].`;
    
    return [response, ''];
  }
  
  help() {
    return "The Liquid Tank module can store liquids, and has a pump for input or output of liquids.";
  }
}