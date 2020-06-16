import { Module } from '../../structure';

export default class Propulsion extends Module {
  constructor() {
    super('Propulsion');
    this.status = "Damaged";
  }
  
  /*use() {
    TODO
  }*/
  
  report() {
    return ['Propulsion systems are compromised. Check the emergency response manual.', 'error'];
  }
  
  help() {
    return "The propulsion systems are built on a fusion-based engine supplemented by antimatter for maximum thrust.";
  }
}