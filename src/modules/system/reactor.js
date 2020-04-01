import { Module } from '../../structure';

export default class Reactor extends Module {
  constructor() {
    super('Reactor', null, 'Damaged');
  }
  
  /*use() {
    TODO
  }*/
  
  report() {
    var response = `Reactor is ${this.status}.`;
    var style = 'success';
    
    if (this.status.toLowerCase() === 'damaged') {
      response += ' Repair immediately.';
      style = 'warning';
    }
    
    return [response, style];
  }
  
  help() {
    return "The reactor is a series of RTG's used to provide electricity to the ship.";
  }
}