import { Module } from '../../structure';

export default class LifeSupport extends Module {
  constructor() {
    super('BackupBattery');
  }
  
  /*use() {
    TODO
  }*/
  
  report() {
    return ['Backup battery charge is at 9%. Energy savings mode activated.', 'warning'];
  }
  
  help() {
    return 'The backup battery keeps the ship running in the case of a failure of the reactor.';
  }
}