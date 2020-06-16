import { Module } from '../../structure';

export default class Communication extends Module {
  constructor() {
    super('Communication');
    this.status = 'Compromised';
  }
  
  /*use() {
    TODO
  }*/
  
  report() {
    return ['Communcation systems are compromised. Check the emergency response manual.', 'error'];
  }
  
  help() {
    return "Using a device entangled (through quantum physics) with a device back on Earth, the Relictus can communicate instantly with Mission Control, even across lightyears of distance.";
  }
}