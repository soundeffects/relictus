import { Module } from '../../structure';

export default class Navigation extends Module {
  constructor() {
    super('Navigation');
    this.status = "Damaged";
  }
  
  /*use() {
    TODO
  }*/
  
  report() {
    var response = `Navigation systems are ${this.status}.`;
    var style = 'success';
    
    if (this.status.toLowerCase() === 'damaged') {
      response += ' Repair immediately.';
      style = 'warning';
    }
    
    return [response, style];
  }
  
  help() {
    return "The navigation systems are used to map surrounding objects and relay the Relictus' position.";
  }
}