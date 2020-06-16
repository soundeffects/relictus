import { Module } from '../../structure';

export default class LifeSupport extends Module {
  constructor() {
    super('LifeSupport');
  }
  
  /*use() {
    TODO
  }*/
  
  report() {
    var response = `Life support is ${this.status}.`;
    var style = 'success';
    
    if (this.status.toLowerCase() === 'damaged') {
      response += ' Repair immediately.';
      style = 'warning';
    }
    
    return [response, style];
  }
  
  help() {
    return 'Life support keeps nutrients, including water and oxygen, flowing to passengers aboard the ship.';
  }
}