import { Module } from '../structure';

export default class Propulsion extends Module {
  constructor() {
    super('Propulsion', 'Compromised');
  }
  
  /*use() {
    TODO
  }*/
  
  report() {
    return ['Propulsion systems are compromised. Check the emergency response manual.', 'error'];
  }
  
  help() {
    return "The propulsion systems allow the Relictus to change velocity and maneauver.";
  }
}