import { Module } from '../structure';

export default class Communication extends Module {
  constructor() {
    super('Communication', 'Compromised');
  }
  
  /*use() {
    TODO
  }*/
  
  report() {
    return ['Communcation systems are compromised. Check the emergency response manual.', 'error'];
  }
  
  help() {
    return "The communication systems send signals to nearby satellites which relay back to Earth, so that the Relictus can communicate with mission control.";
  }
}