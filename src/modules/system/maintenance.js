import { Module } from '../../structure';
import Map from '../../map';
 
export default class Maintenance extends Module {
  #lockedBot;
  
  constructor() {
    super('Maintenance Pad', 'maintenance');
    this.status = 'Pending Activation'
    this.#lockedBot = null;
  }
  
  use(actor, parameters, bots, flags, addFlag, addBot, addScore) {
    
  }
  
  report() {
    if (this.status === 'Pending Activation') {
      return ["There are one or more bots pending activation currently on the pad. Use 'system maintenance activate' to activate.", 'success'];
    }
    return ['Maintenance Pad is operational. Currently on standby.', '']
  }
  
  help() {
    return "The Maintenence Pad quickly repairs and realigns all the components for all bots on the pad. Simply use the action [maintenance] to perform this. If the parameter 'activate' is used, it will activate a newly constructed bot and link it with system controls.";
  }
}