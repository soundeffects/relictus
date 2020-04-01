import { Module } from '../../structure';

export default class Surveillance extends Module {
  constructor() {
    super('Surveillance', null, 'Damaged');
  }
  
  /*use() {
    TODO
  }*/
  
  report() {
    var response = `Surveillance systems are ${this.status}.`;
    var style = 'success';
    
    if (this.status.toLowerCase() === 'damaged') {
      response += ' Repair immediately.';
      style = 'warning';
    }
    
    return [response, style];
  }
  
  help() {
    return "The surveillance systems are a series of cameras and other sensors, allowing users to monitor the ship.";
  }
}