import { Module } from '../structure';

export default class Grasper extends Module {
  constructor() {
    super("Grasper", "use");
  }
  
  use(actor, parameters, bots, flags, addFlag, addBot, addScore) {
    return [[]];
  }
  
  report() {
    var response = `Grasper is ${this.status}. Grasper linked to action [use].`;
    
    return [response, ''];
  }
  
  help() {
    return "The grasper allows you to use the [use] action to pick up and use objects that can be held.";
  }
}